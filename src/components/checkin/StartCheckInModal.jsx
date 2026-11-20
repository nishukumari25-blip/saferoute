import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { Clock, Navigation, MapPin } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { useToast } from '../../context/ToastContext';

export const StartCheckInModal = ({ isOpen, onClose }) => {
  const { startCheckIn } = useEmergency();
  const { toast } = useToast();

  const [destination, setDestination] = useState('');
  const [expectedMinutes, setExpectedMinutes] = useState(30);
  const [notes, setNotes] = useState('');

  const durationPresets = [15, 30, 45, 60, 90];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination.trim()) {
      toast.error('Please enter your destination or travel description.');
      return;
    }

    startCheckIn({
      destination,
      expectedMinutes,
      notes,
    });

    toast.success(`Safety Check-In started! Timer set for ${expectedMinutes} mins.`);
    onClose();
    setDestination('');
    setNotes('');
    setExpectedMinutes(30);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Start New Safety Check-In"
      size="md"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" icon={Clock} onClick={handleSubmit}>
            Start Check-In Timer
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="chk-destination">
            <MapPin size={16} /> Destination or Activity *
          </label>
          <input
            id="chk-destination"
            type="text"
            className="form-control"
            placeholder="e.g. Taking Uber cab to Indiranagar home"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
          <span className="form-hint">E.g. Auto ride, walking back from library, night commute.</span>
        </div>

        {/* Duration presets */}
        <div className="form-group">
          <label className="form-label">
            <Clock size={16} /> Expected Travel Time
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            {durationPresets.map((mins) => (
              <button
                key={mins}
                type="button"
                className={`btn btn-sm ${expectedMinutes === mins ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setExpectedMinutes(mins)}
              >
                {mins} Mins
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Or custom minutes:</span>
            <input
              type="number"
              min="5"
              max="240"
              value={expectedMinutes}
              onChange={(e) => setExpectedMinutes(Math.max(5, parseInt(e.target.value, 10) || 5))}
              style={{ width: '80px', padding: '0.4rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-border)' }}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="chk-notes">
            Cab Number / Vehicle Details / Note (Optional)
          </label>
          <input
            id="chk-notes"
            type="text"
            className="form-control"
            placeholder="e.g. White Swift Dzire KA-01-AB-1234, Driver: Ramesh"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div
          style={{
            padding: '0.75rem',
            backgroundColor: 'var(--color-primary-light)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8rem',
            color: 'var(--color-primary-dark)',
          }}
        >
          ℹ️ If you do not mark yourself safe before time expires, your SafeRoute dashboard will prominently alert you with reminders.
        </div>
      </form>
    </Modal>
  );
};

export default StartCheckInModal;
