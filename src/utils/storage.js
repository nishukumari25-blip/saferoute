/**
 * LocalStorage utility with error handling and JSON serialization
 */

export const STORAGE_KEYS = {
  USER: 'saferoute_user',
  USERS_LIST: 'saferoute_registered_users',
  CONTACTS: 'saferoute_contacts',
  SOS_STATE: 'saferoute_sos_state',
  SOS_LOGS: 'saferoute_sos_logs',
  CHECK_INS: 'saferoute_checkins',
  ACTIVE_CHECK_IN: 'saferoute_active_checkin',
  LOCATION_HISTORY: 'saferoute_location_history',
  SETTINGS: 'saferoute_user_settings',
};

export const getStorage = (key, defaultValue = null) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw === undefined) {
      return defaultValue;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

export const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
};

export const clearSafeRouteStorage = () => {
  try {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    return true;
  } catch (err) {
    console.error('Error clearing SafeRoute data', err);
    return false;
  }
};
