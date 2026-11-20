import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Volume2,
  Bell,
  Shield,
  Trash2,
  Download,
  Moon,
  Sun,
  Check,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import { useEmergency } from '../context/EmergencyContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { clearSafeRouteStorage } from '../utils/storage';
import { soundManager } from '../utils/audio';

export const SettingsPage = () => {
  const { settings, updateSettings } = useEmergency();
  const { logout } = useAuth();
  const { toast } = useToast();

  const [confirmReset, setConfirmReset] = useState(false);

  const handleToggle = (key) => {
    updateSettings({ [key]: !settings[key] });
    toast.success('Preference updated.');
  };

  const handleThemeChange = (newTheme) => {
    updateSettings({ theme: newTheme });
    toast.info(`Theme switched to ${newTheme} mode.`);
  };

  const handleTestSiren = () => {
    soundManager.startSiren();
    toast.warning('Playing test siren (3 seconds)...');
    setTimeout(() => {
      soundManager.stopSiren();
    }, 3000);
  };

  const handleExportData = () => {
    try {
      const data = {
        exportedAt: new Date().toISOString(),
        settings,
        contacts: localStorage.getItem('saferoute_contacts'),
        checkIns: localStorage.getItem('saferoute_checkins'),
        sosLogs: localStorage.getItem('saferoute_sos_logs'),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `saferoute_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('SafeRoute data exported successfully.');
    } catch (e) {
      toast.error('Failed to export data.');
    }
  };

  const handleResetData = () => {
    clearSafeRouteStorage();
    toast.warning('All SafeRoute local storage cleared. Reloading...');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.25rem' }}>
          Preferences & Settings
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
          Customize your emergency siren behavior, privacy mode, and manage local data.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {/* Audio & Alert Settings */}
        <Card>
          <CardHeader
            title="Audio & Siren Preferences"
            subtitle="Configure audible panic alarms"
            icon={Volume2}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '0.95rem' }}>Emergency Siren Sound</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  Sounds high-pitch audible siren to scare off aggressors during SOS.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.soundAlerts}
                onChange={() => handleToggle('soundAlerts')}
                style={{ width: 22, height: 22, cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '0.95rem' }}>Test Audio Alarm</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  Play a 3-second test siren using Web Audio API synthesizer.
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleTestSiren}>
                Test Siren Tone
              </Button>
            </div>
          </div>
        </Card>

        {/* Privacy & Location Settings */}
        <Card>
          <CardHeader
            title="Privacy & Location Sharing"
            subtitle="Control data visibility"
            icon={Shield}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '0.95rem' }}>Auto-Attach GPS to SOS Broadcasts</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  Immediately retrieves browser coordinates when activating SOS.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoLocationShareOnSos}
                onChange={() => handleToggle('autoLocationShareOnSos')}
                style={{ width: 22, height: 22, cursor: 'pointer' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontSize: '0.95rem' }}>Privacy Mode (Discreet Dashboard)</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  Hides full telephone numbers on the dashboard when in public spaces.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.privacyMode}
                onChange={() => handleToggle('privacyMode')}
                style={{ width: 22, height: 22, cursor: 'pointer' }}
              />
            </div>
          </div>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader
            title="Appearance Theme"
            subtitle="Choose interface mode"
            icon={settings.theme === 'dark' ? Moon : Sun}
          />

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => handleThemeChange('light')}
              className={`btn ${settings.theme !== 'dark' ? 'btn-primary' : 'btn-outline'}`}
              style={{ flex: 1, padding: '0.75rem' }}
            >
              <Sun size={18} />
              <span>Light Mode (Default)</span>
            </button>

            <button
              onClick={() => handleThemeChange('dark')}
              className={`btn ${settings.theme === 'dark' ? 'btn-primary' : 'btn-outline'}`}
              style={{ flex: 1, padding: '0.75rem' }}
            >
              <Moon size={18} />
              <span>Dark Mode (Night Commute)</span>
            </button>
          </div>
        </Card>

        {/* Data Management & Reset */}
        <Card>
          <CardHeader
            title="Local Data Management"
            subtitle="Backup and reset LocalStorage data"
            icon={RotateCcw}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '0.95rem' }}>Export Data JSON</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  Download your contacts, past check-ins, and activity logs.
                </p>
              </div>
              <Button variant="outline" size="sm" icon={Download} onClick={handleExportData}>
                Export JSON
              </Button>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--color-surface-alt)',
                paddingTop: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong style={{ fontSize: '0.95rem', color: 'var(--color-danger)' }}>
                  Clear & Reset All SafeRoute Data
                </strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  Deletes all contacts, history, and active sessions from this browser.
                </p>
              </div>

              {confirmReset ? (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button variant="danger" size="sm" onClick={handleResetData}>
                    Yes, Reset Everything
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setConfirmReset(false)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button variant="danger" size="sm" icon={Trash2} onClick={() => setConfirmReset(true)}>
                  Reset All
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
