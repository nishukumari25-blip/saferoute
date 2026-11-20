import React, { useState } from 'react';
import { AlertOctagon, Volume2, VolumeX, ShieldAlert, CheckCircle } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useEmergency } from '../../context/EmergencyContext';
import SosModal from '../sos/SosModal';

export const SosQuickCard = () => {
  const { isSosActive, triggerSos, cancelSos, settings, updateSettings } = useEmergency();
  const [showSosModal, setShowSosModal] = useState(false);

  const toggleSoundAlerts = () => {
    updateSettings({ soundAlerts: !settings.soundAlerts });
  };

  return (
    <>
      <Card
        className="card-hover"
        style={{
          border: isSosActive ? '2px solid var(--color-danger)' : undefined,
          background: isSosActive ? 'var(--color-danger-light)' : 'var(--color-surface)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '2rem 1.5rem',
        }}
      >
        <div style={{ marginBottom: '1rem', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className={`status-dot ${isSosActive ? 'red' : 'green'}`} />
            <strong style={{ fontSize: '0.85rem', color: isSosActive ? 'var(--color-danger)' : 'var(--color-text-main)' }}>
              {isSosActive ? 'EMERGENCY IN PROGRESS' : 'SOS READY'}
            </strong>
          </div>
          <button
            onClick={toggleSoundAlerts}
            className="btn-icon"
            style={{
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)',
              background: settings.soundAlerts ? 'var(--color-primary-light)' : 'var(--color-surface-alt)',
              color: settings.soundAlerts ? 'var(--color-primary)' : 'var(--color-text-muted)',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            title={settings.soundAlerts ? 'Siren sound enabled' : 'Siren muted'}
          >
            {settings.soundAlerts ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span>{settings.soundAlerts ? 'Siren On' : 'Siren Muted'}</span>
          </button>
        </div>

        {/* Big Central SOS Trigger Button */}
        <div style={{ padding: '1rem 0' }}>
          {isSosActive ? (
            <button
              onClick={cancelSos}
              className="sos-trigger-btn sos-pulse-animation"
              style={{
                background: 'radial-gradient(circle, #10B981 0%, #059669 100%)',
                borderColor: '#D1FAE5',
              }}
              aria-label="Cancel Active Emergency SOS"
            >
              <CheckCircle size={44} />
              <strong style={{ fontSize: '1.25rem', letterSpacing: '0.05em' }}>I AM SAFE</strong>
              <span style={{ fontSize: '0.75rem', opacity: 0.9 }}>Cancel Alert</span>
            </button>
          ) : (
            <button
              onClick={() => setShowSosModal(true)}
              className="sos-trigger-btn"
              aria-label="Trigger Emergency SOS"
            >
              <AlertOctagon size={48} />
              <strong style={{ fontSize: '1.85rem', letterSpacing: '0.05em', lineHeight: 1 }}>SOS</strong>
              <span style={{ fontSize: '0.75rem', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Tap to Activate
              </span>
            </button>
          )}
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.5rem', maxWidth: '320px' }}>
          {isSosActive
            ? 'Alert active. Primary contacts notified with your simulated GPS fix.'
            : 'Press to send simulated emergency broadcast with live GPS to your contacts.'}
        </p>

        <div
          style={{
            marginTop: '1.25rem',
            padding: '0.6rem 0.85rem',
            backgroundColor: 'var(--color-surface-alt)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            width: '100%',
          }}
        >
          <strong>Notice:</strong> SafeRoute is a web companion demo. It simulates emergency contact alerts and does not dial police directly.
        </div>
      </Card>

      {/* Confirmation & Countdown Modal */}
      <SosModal
        isOpen={showSosModal}
        onClose={() => setShowSosModal(false)}
      />
    </>
  );
};

export default SosQuickCard;
