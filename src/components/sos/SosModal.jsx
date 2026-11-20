import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { AlertOctagon, Volume2, VolumeX, ShieldAlert, Check } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { useToast } from '../../context/ToastContext';
import useGeolocation from '../../hooks/useGeolocation';

export const SosModal = ({ isOpen, onClose }) => {
  const { triggerSos, settings, contacts } = useEmergency();
  const { toast } = useToast();
  const { location, getCurrentPosition } = useGeolocation();

  const [countdown, setCountdown] = useState(5);
  const [soundEnabled, setSoundEnabled] = useState(settings.soundAlerts);
  const [isCountingDown, setIsCountingDown] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCountdown(5);
      setIsCountingDown(true);
      // Fetch latest location in background
      getCurrentPosition(false);
    } else {
      setIsCountingDown(false);
    }
  }, [isOpen, getCurrentPosition]);

  useEffect(() => {
    let timer = null;
    if (isCountingDown && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isCountingDown && countdown === 0) {
      handleConfirmTrigger();
    }
    return () => clearTimeout(timer);
  }, [isCountingDown, countdown]);

  const handleConfirmTrigger = () => {
    setIsCountingDown(false);
    triggerSos({ location, soundAlarm: soundEnabled });
    toast.error('Emergency SOS Activated! Simulated broadcast dispatched.');
    onClose();
  };

  const handleCancelCountdown = () => {
    setIsCountingDown(false);
    toast.info('Emergency activation cancelled.');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancelCountdown}
      title="Confirm Emergency SOS Broadcast"
      size="md"
      footer={
        <>
          <Button variant="ghost" onClick={handleCancelCountdown}>
            Cancel (Don't Send)
          </Button>
          <Button
            variant="danger"
            icon={AlertOctagon}
            onClick={handleConfirmTrigger}
            style={{ fontWeight: 700 }}
          >
            Activate Now ({countdown}s)
          </Button>
        </>
      }
    >
      <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            backgroundColor: 'var(--color-danger-light)',
            color: 'var(--color-danger)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
          }}
        >
          <AlertOctagon size={36} />
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--color-danger)' }}>
          Broadcasting Emergency Alert in {countdown} Seconds
        </h3>

        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
          This will simulate sending an urgent SOS notification with your current GPS coordinates to{' '}
          <strong>{contacts.length} emergency contacts</strong>.
        </p>

        {/* Siren Sound Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.85rem 1.25rem',
            backgroundColor: 'var(--color-surface-alt)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1rem',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {soundEnabled ? <Volume2 size={20} color="var(--color-danger)" /> : <VolumeX size={20} />}
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Audible High-Pitch Siren</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                Sounds loud alarm to deter attackers and attract nearby bystanders.
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="btn btn-outline btn-sm"
          >
            {soundEnabled ? 'Enabled' : 'Muted'}
          </button>
        </div>

        {/* Disclaimer reminder */}
        <div
          style={{
            fontSize: '0.78rem',
            color: 'var(--color-text-light)',
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            padding: '0.6rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            textAlign: 'left',
          }}
        >
          ⚠️ <strong>Simulation Notice:</strong> SafeRoute is a web client. It does not contact local police (112/911) automatically. In immediate physical danger, dial 112 directly.
        </div>
      </div>
    </Modal>
  );
};

export default SosModal;
