import React, { useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  Phone,
  CheckCircle,
  Volume2,
  VolumeX,
  MapPin,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { useEmergency } from '../context/EmergencyContext';
import { useToast } from '../context/ToastContext';
import SosModal from '../components/sos/SosModal';
import useGeolocation from '../hooks/useGeolocation';
import { formatCoordinates, getGoogleMapsUrl, formatDateTime, sanitizePhoneForTel } from '../utils/formatters';

export const SosPage = () => {
  const {
    isSosActive,
    sosDetails,
    cancelSos,
    contacts,
    settings,
    updateSettings,
    sosLogs,
  } = useEmergency();

  const { location, getCurrentPosition } = useGeolocation();
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);

  const toggleSound = () => {
    updateSettings({ soundAlerts: !settings.soundAlerts });
  };

  const handleCancel = () => {
    cancelSos();
    toast.success('Emergency alert cancelled. You are marked safe.');
  };

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.25rem' }}>
          Emergency SOS Panic Center
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
          High-priority emergency tools with loud audible deterrent and simulated instant broadcast.
        </p>
      </div>

      {/* Active Alert Banner if SOS is ON */}
      {isSosActive && (
        <div
          style={{
            backgroundColor: 'var(--color-danger-light)',
            border: '2px solid var(--color-danger)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            marginBottom: '2rem',
            animation: 'fadeIn 250ms ease-out',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-danger)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-danger-dark)' }}>
                  EMERGENCY SOS ALERT ACTIVATED
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-danger-dark)' }}>
                  Activated at {formatDateTime(sosDetails?.activatedAt)}
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              icon={CheckCircle}
              onClick={handleCancel}
              style={{ backgroundColor: '#10B981', borderColor: '#10B981' }}
            >
              I Am Safe Now (Cancel Alert)
            </Button>
          </div>

          <div
            style={{
              padding: '1rem',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #FECACA',
              marginBottom: '1rem',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--color-danger-dark)' }}>
              Simulated Broadcast Dispatched to {sosDetails?.simulatedSmsRecipients?.length || contacts.length} Contacts:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {(sosDetails?.simulatedSmsRecipients || contacts).map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    padding: '0.4rem 0.6rem',
                    backgroundColor: 'var(--color-surface-alt)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{r.name} ({r.phone})</span>
                  <span style={{ color: '#10B981', fontWeight: 600 }}>✓ Simulated Alert Sent</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main SOS Trigger Hub */}
      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        {/* Left: Huge Interactive SOS Button */}
        <Card
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem 2rem',
            textAlign: 'center',
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <span
              className={`badge ${isSosActive ? 'badge-danger' : 'badge-primary'}`}
              style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}
            >
              {isSosActive ? 'EMERGENCY IN PROGRESS' : 'READY TO TRIGGER'}
            </span>
          </div>

          {isSosActive ? (
            <button
              onClick={handleCancel}
              className="sos-trigger-btn sos-pulse-animation"
              style={{
                width: 200,
                height: 200,
                background: 'radial-gradient(circle, #10B981 0%, #059669 100%)',
                borderColor: '#D1FAE5',
              }}
              aria-label="Deactivate SOS Alert"
            >
              <CheckCircle size={56} />
              <strong style={{ fontSize: '1.4rem' }}>I AM SAFE</strong>
              <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>Cancel Broadcast</span>
            </button>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="sos-trigger-btn"
              style={{ width: 200, height: 200 }}
              aria-label="Activate Emergency SOS"
            >
              <AlertOctagon size={56} />
              <strong style={{ fontSize: '2rem', letterSpacing: '0.08em' }}>SOS</strong>
              <span style={{ fontSize: '0.8rem', opacity: 0.9, textTransform: 'uppercase' }}>
                Tap to Trigger
              </span>
            </button>
          )}

          <p style={{ marginTop: '1.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', maxWidth: '340px' }}>
            {isSosActive
              ? 'Your simulated alert is active. Tap above to conclude and stop the audible alarm.'
              : 'Pressing SOS triggers a 5-second countdown confirmation before sending simulated alerts.'}
          </p>

          {/* Sound Mute / Siren Toggle */}
          <div style={{ marginTop: '1.5rem' }}>
            <button
              onClick={toggleSound}
              className="btn btn-outline btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {settings.soundAlerts ? <Volume2 size={16} color="var(--color-danger)" /> : <VolumeX size={16} />}
              <span>Siren Tone: {settings.soundAlerts ? 'Enabled' : 'Muted'}</span>
            </button>
          </div>
        </Card>

        {/* Right: Direct Dial Helplines & Instructions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Official Helplines Box */}
          <Card>
            <CardHeader
              title="Official Emergency Helplines"
              subtitle="Direct dial to real authorities"
              icon={Phone}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  backgroundColor: 'var(--color-danger-light)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--color-danger-dark)' }}>112</strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-danger-dark)', marginLeft: '0.5rem' }}>
                    National All-in-One Helpline (ERSS)
                  </span>
                </div>
                <a href="tel:112" className="btn btn-danger btn-sm">
                  Call 112
                </a>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  backgroundColor: 'var(--color-secondary)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--color-secondary-text)' }}>1091</strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-secondary-text)', marginLeft: '0.5rem' }}>
                    Women Police Helpline
                  </span>
                </div>
                <a href="tel:1091" className="btn btn-secondary btn-sm" style={{ background: '#FFFFFF' }}>
                  Call 1091
                </a>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  backgroundColor: 'var(--color-surface-alt)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div>
                  <strong style={{ fontSize: '1.1rem' }}>181</strong>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>
                    Women in Distress Support
                  </span>
                </div>
                <a href="tel:181" className="btn btn-outline btn-sm">
                  Call 181
                </a>
              </div>
            </div>
          </Card>

          {/* Transparent Simulation Disclaimer Notice */}
          <Card style={{ backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <ShieldAlert size={24} color="#D97706" style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#92400E', marginBottom: '0.25rem' }}>
                  Important Safety & Simulation Notice
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#B45309', lineHeight: 1.5 }}>
                  SafeRoute does not dispatch emergency response personnel or contact local police automatically.
                  Emergency SOS creates simulated broadcasts to your registered contact circle and plays an audible alarm.
                  If you are in real danger, always dial <strong>112</strong> immediately.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Confirmation Modal */}
      <SosModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default SosPage;
