import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getStorage, setStorage, STORAGE_KEYS } from '../utils/storage';
import { INITIAL_CONTACTS, DEFAULT_SETTINGS } from '../utils/constants';
import { soundManager } from '../utils/audio';

const EmergencyContext = createContext(null);

export const EmergencyProvider = ({ children }) => {
  // 1. Emergency Contacts
  const [contacts, setContacts] = useState(() => {
    const saved = getStorage(STORAGE_KEYS.CONTACTS, null);
    if (!saved || !saved.length) {
      setStorage(STORAGE_KEYS.CONTACTS, INITIAL_CONTACTS);
      return INITIAL_CONTACTS;
    }
    return saved;
  });

  // 2. SOS Emergency State
  const [isSosActive, setIsSosActive] = useState(() => {
    const savedState = getStorage(STORAGE_KEYS.SOS_STATE, null);
    return Boolean(savedState && savedState.active);
  });

  const [sosDetails, setSosDetails] = useState(() => {
    return getStorage(STORAGE_KEYS.SOS_STATE, null);
  });

  const [sosLogs, setSosLogs] = useState(() => {
    return getStorage(STORAGE_KEYS.SOS_LOGS, [
      {
        id: 'log_seed_01',
        timestamp: '2026-03-01T21:40:00.000Z',
        type: 'Routine Check-in Alert (Test)',
        status: 'Resolved safely',
        notes: 'Simulated system alert check completed',
      },
    ]);
  });

  // 3. Safety Check-In State
  const [activeCheckIn, setActiveCheckIn] = useState(() => {
    const saved = getStorage(STORAGE_KEYS.ACTIVE_CHECK_IN, null);
    if (saved && saved.status === 'active') {
      return saved;
    }
    return null;
  });

  const [checkInHistory, setCheckInHistory] = useState(() => {
    return getStorage(STORAGE_KEYS.CHECK_INS, [
      {
        id: 'chk_hist_1',
        destination: 'Metro Station to Home (Late commute)',
        startedAt: '2026-03-10T22:15:00.000Z',
        expectedAt: '2026-03-10T22:45:00.000Z',
        completedAt: '2026-03-10T22:41:00.000Z',
        status: 'safe',
        notes: 'Cab ride safely reached apartment gate',
      },
      {
        id: 'chk_hist_2',
        destination: 'Evening Jog at Cubbon Park',
        startedAt: '2026-03-12T18:00:00.000Z',
        expectedAt: '2026-03-12T19:00:00.000Z',
        completedAt: '2026-03-12T18:52:00.000Z',
        status: 'safe',
        notes: 'Returned before dusk',
      },
    ]);
  });

  // 4. User Settings
  const [settings, setSettings] = useState(() => {
    const saved = getStorage(STORAGE_KEYS.SETTINGS, null);
    return saved ? { ...DEFAULT_SETTINGS, ...saved } : DEFAULT_SETTINGS;
  });

  // 5. Global Location Cache
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLocationSharing, setIsLocationSharing] = useState(false);

  // Sync contacts to storage
  const saveContacts = (updated) => {
    setContacts(updated);
    setStorage(STORAGE_KEYS.CONTACTS, updated);
  };

  const addContact = (contactData) => {
    const newContact = {
      id: 'cnt_' + Date.now(),
      ...contactData,
      isPrimary: contacts.length === 0 ? true : Boolean(contactData.isPrimary),
      createdAt: new Date().toISOString(),
    };

    let updatedList;
    if (newContact.isPrimary) {
      updatedList = contacts.map((c) => ({ ...c, isPrimary: false })).concat(newContact);
    } else {
      updatedList = [...contacts, newContact];
    }

    saveContacts(updatedList);
    return newContact;
  };

  const updateContact = (id, fields) => {
    let updatedList = contacts.map((c) => {
      if (c.id === id) {
        return { ...c, ...fields };
      }
      if (fields.isPrimary && c.id !== id) {
        return { ...c, isPrimary: false };
      }
      return c;
    });

    saveContacts(updatedList);
    return true;
  };

  const deleteContact = (id) => {
    const filtered = contacts.filter((c) => c.id !== id);
    if (filtered.length > 0 && !filtered.some((c) => c.isPrimary)) {
      filtered[0].isPrimary = true;
    }
    saveContacts(filtered);
    return true;
  };

  const setPrimaryContact = (id) => {
    const updated = contacts.map((c) => ({
      ...c,
      isPrimary: c.id === id,
    }));
    saveContacts(updated);
  };

  // SOS Activation & Cancellation
  const triggerSos = useCallback(
    ({ location, soundAlarm = true } = {}) => {
      const alertTime = new Date().toISOString();
      const activeState = {
        id: 'sos_' + Date.now(),
        active: true,
        activatedAt: alertTime,
        location: location || currentLocation || {
          latitude: 12.9716,
          longitude: 77.5946,
          accuracy: 15,
          timestamp: Date.now(),
          addressText: 'Bengaluru, Karnataka (Approximate GPS fix)',
        },
        soundAlarm: settings.soundAlerts && soundAlarm,
        simulatedSmsRecipients: contacts.map((c) => ({
          id: c.id,
          name: c.name,
          phone: c.phone,
          status: 'Simulated Alert Broadcast Sent',
        })),
      };

      setIsSosActive(true);
      setSosDetails(activeState);
      setStorage(STORAGE_KEYS.SOS_STATE, activeState);

      // Play emergency siren if enabled
      if (settings.soundAlerts && soundAlarm) {
        soundManager.startSiren();
      }

      // Add to SOS logs
      const newLog = {
        id: activeState.id,
        timestamp: alertTime,
        type: 'Emergency SOS Broadcast (Simulation)',
        status: 'Active Alert',
        location: activeState.location,
        recipientsCount: contacts.length,
      };
      const updatedLogs = [newLog, ...sosLogs];
      setSosLogs(updatedLogs);
      setStorage(STORAGE_KEYS.SOS_LOGS, updatedLogs);

      return activeState;
    },
    [contacts, currentLocation, settings.soundAlerts, sosLogs]
  );

  const cancelSos = useCallback(() => {
    soundManager.stopSiren();
    setIsSosActive(false);
    setSosDetails(null);
    setStorage(STORAGE_KEYS.SOS_STATE, null);

    // Update log entry to resolved
    if (sosLogs.length > 0) {
      const updatedLogs = sosLogs.map((log, index) => {
        if (index === 0 && log.status === 'Active Alert') {
          return {
            ...log,
            status: 'Alert Cancelled / User Confirmed Safe',
            cancelledAt: new Date().toISOString(),
          };
        }
        return log;
      });
      setSosLogs(updatedLogs);
      setStorage(STORAGE_KEYS.SOS_LOGS, updatedLogs);
    }
  }, [sosLogs]);

  // Safety Check-In controls
  const startCheckIn = ({ destination, expectedMinutes, notes = '' }) => {
    const startedAt = new Date();
    const durationMs = parseInt(expectedMinutes, 10) * 60 * 1000;
    const expectedAt = new Date(startedAt.getTime() + durationMs);

    const newCheckIn = {
      id: 'chk_' + Date.now(),
      destination: destination.trim(),
      expectedMinutes: parseInt(expectedMinutes, 10),
      startedAt: startedAt.toISOString(),
      expectedAt: expectedAt.toISOString(),
      status: 'active',
      notes: notes.trim(),
    };

    setActiveCheckIn(newCheckIn);
    setStorage(STORAGE_KEYS.ACTIVE_CHECK_IN, newCheckIn);
    return newCheckIn;
  };

  const markSafe = (id) => {
    const completedAt = new Date().toISOString();
    let completedItem = null;

    if (activeCheckIn && (activeCheckIn.id === id || !id)) {
      completedItem = {
        ...activeCheckIn,
        status: 'safe',
        completedAt,
      };
      setActiveCheckIn(null);
      setStorage(STORAGE_KEYS.ACTIVE_CHECK_IN, null);
    }

    if (completedItem) {
      const updatedHistory = [completedItem, ...checkInHistory];
      setCheckInHistory(updatedHistory);
      setStorage(STORAGE_KEYS.CHECK_INS, updatedHistory);
      soundManager.playSuccessChime();
    }
  };

  const extendCheckIn = (id, extraMinutes) => {
    if (!activeCheckIn) return;
    const currentExpected = new Date(activeCheckIn.expectedAt).getTime();
    const newExpected = new Date(currentExpected + extraMinutes * 60 * 1000).toISOString();
    const updated = {
      ...activeCheckIn,
      expectedAt: newExpected,
      expectedMinutes: activeCheckIn.expectedMinutes + extraMinutes,
    };
    setActiveCheckIn(updated);
    setStorage(STORAGE_KEYS.ACTIVE_CHECK_IN, updated);
  };

  // Settings update
  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    setStorage(STORAGE_KEYS.SETTINGS, updated);

    // Apply theme
    if (updated.theme) {
      document.documentElement.setAttribute('data-theme', updated.theme);
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    if (settings.theme) {
      document.documentElement.setAttribute('data-theme', settings.theme);
    }
  }, [settings.theme]);

  return (
    <EmergencyContext.Provider
      value={{
        contacts,
        addContact,
        updateContact,
        deleteContact,
        setPrimaryContact,

        isSosActive,
        sosDetails,
        sosLogs,
        triggerSos,
        cancelSos,

        activeCheckIn,
        checkInHistory,
        startCheckIn,
        markSafe,
        extendCheckIn,

        settings,
        updateSettings,

        currentLocation,
        setCurrentLocation,
        isLocationSharing,
        setIsLocationSharing,
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error('useEmergency must be used within an EmergencyProvider');
  }
  return context;
};
