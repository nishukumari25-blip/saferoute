import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, PlusCircle, AlertCircle } from 'lucide-react';
import Card, { CardHeader } from '../common/Card';
import Button from '../common/Button';
import { useEmergency } from '../../context/EmergencyContext';
import { formatSecondsToTime, formatDateTime } from '../../utils/formatters';

export const CheckInWidget = ({ onOpenStartModal }) => {
  const { activeCheckIn, markSafe, extendCheckIn } = useEmergency();
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  useEffect(() => {
    if (!activeCheckIn) return;

    const calculateRemaining = () => {
      const expectedTime = new Date(activeCheckIn.expectedAt).getTime();
      const now = Date.now();
      const diffSec = Math.max(0, Math.floor((expectedTime - now) / 1000));
      setSecondsRemaining(diffSec);
    };

    calculateRemaining();
    const timer = setInterval(calculateRemaining, 1000);
    return () => clearInterval(timer);
  }, [activeCheckIn]);

  const isOverdue = secondsRemaining === 0 && Boolean(activeCheckIn);

  return (
    <Card className="card-hover">
      <CardHeader
        title="Safety Check-In"
        subtitle={activeCheckIn ? 'Active countdown in progress' : 'Automated journey monitoring'}
        icon={Clock}
      />

      {activeCheckIn ? (
        <div
          style={{
            padding: '1.25rem',
            backgroundColor: isOverdue ? 'var(--color-danger-light)' : 'var(--color-primary-light)',
            borderRadius: 'var(--radius-lg)',
            border: `1.5px solid ${isOverdue ? 'var(--color-danger)' : 'var(--color-primary)'}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span
              className={`badge ${isOverdue ? 'badge-danger' : 'badge-primary'}`}
              style={{ fontWeight: 700 }}
            >
              {isOverdue ? 'OVERDUE — ACTION REQUIRED' : 'EN ROUTE'}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              Started {new Date(activeCheckIn.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-main)', marginBottom: '0.25rem' }}>
            {activeCheckIn.destination}
          </div>

          {activeCheckIn.notes && (
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
              Note: {activeCheckIn.notes}
            </p>
          )}

          {/* Countdown Clock Display */}
          <div style={{ margin: '1rem 0', textAlign: 'center' }}>
            <div
              style={{
                fontSize: '2.5rem',
                fontFamily: 'monospace',
                fontWeight: 800,
                color: isOverdue ? 'var(--color-danger)' : 'var(--color-primary)',
                letterSpacing: '0.05em',
              }}
            >
              {formatSecondsToTime(secondsRemaining)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              {isOverdue ? 'Expected arrival time has elapsed!' : 'Remaining time before safe check-in'}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <Button
              variant="primary"
              icon={CheckCircle2}
              onClick={() => markSafe(activeCheckIn.id)}
              style={{ flex: 1, backgroundColor: '#10B981', borderColor: '#10B981', color: '#fff' }}
            >
              I Arrived Safely
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => extendCheckIn(activeCheckIn.id, 15)}
            >
              +15 Mins
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '1.25rem 0' }}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: 'var(--color-surface-alt)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem',
              color: 'var(--color-primary)',
            }}
          >
            <Clock size={24} />
          </div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.25rem' }}>
            No Active Check-In
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            Heading out for an auto ride, walk, or night transit? Set an estimated arrival time.
          </p>
          <Button
            variant="outline"
            size="sm"
            icon={PlusCircle}
            onClick={onOpenStartModal}
          >
            New Safety Check-In
          </Button>
        </div>
      )}
    </Card>
  );
};

export default CheckInWidget;
