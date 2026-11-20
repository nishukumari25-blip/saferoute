import React, { useState, useEffect } from 'react';
import { Clock, Plus, CheckCircle2, History, AlertCircle, MapPin, Calendar } from 'lucide-react';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import EmptyState from '../components/common/EmptyState';
import StartCheckInModal from '../components/checkin/StartCheckInModal';
import { useEmergency } from '../context/EmergencyContext';
import { formatSecondsToTime, formatDateTime } from '../utils/formatters';

export const CheckInPage = () => {
  const { activeCheckIn, checkInHistory, markSafe, extendCheckIn } = useEmergency();
  const [showModal, setShowModal] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  useEffect(() => {
    if (!activeCheckIn) return;

    const tick = () => {
      const exp = new Date(activeCheckIn.expectedAt).getTime();
      const diff = Math.max(0, Math.floor((exp - Date.now()) / 1000));
      setSecondsRemaining(diff);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [activeCheckIn]);

  const isOverdue = secondsRemaining === 0 && Boolean(activeCheckIn);

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.25rem' }}>
            Automated Safety Check-Ins
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Set an expected arrival timer when traveling. SafeRoute keeps you accounted for.
          </p>
        </div>

        {!activeCheckIn && (
          <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
            Start New Check-In
          </Button>
        )}
      </div>

      {/* Active Check-In Banner / Card */}
      {activeCheckIn ? (
        <Card
          style={{
            marginBottom: '2rem',
            border: `2px solid ${isOverdue ? 'var(--color-danger)' : 'var(--color-primary)'}`,
            background: isOverdue ? 'var(--color-danger-light)' : 'var(--color-surface)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className={`status-dot ${isOverdue ? 'red' : 'purple'}`} />
              <Badge variant={isOverdue ? 'danger' : 'primary'}>
                {isOverdue ? 'OVERDUE CHECK-IN' : 'TIMER ACTIVE'}
              </Badge>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Started: {formatDateTime(activeCheckIn.startedAt)}
            </span>
          </div>

          <div className="grid-2" style={{ alignItems: 'center', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                {activeCheckIn.destination}
              </h2>
              {activeCheckIn.notes && (
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                  <strong>Trip details:</strong> {activeCheckIn.notes}
                </p>
              )}
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Target arrival by: <strong>{formatDateTime(activeCheckIn.expectedAt)}</strong>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <Button
                  variant="primary"
                  size="lg"
                  icon={CheckCircle2}
                  onClick={() => markSafe(activeCheckIn.id)}
                  style={{ backgroundColor: '#10B981', borderColor: '#10B981', fontWeight: 700 }}
                >
                  I Have Arrived Safely
                </Button>

                <Button
                  variant="outline"
                  onClick={() => extendCheckIn(activeCheckIn.id, 15)}
                >
                  +15 Mins
                </Button>
                <Button
                  variant="outline"
                  onClick={() => extendCheckIn(activeCheckIn.id, 30)}
                >
                  +30 Mins
                </Button>
              </div>
            </div>

            {/* Countdown Box */}
            <div
              style={{
                backgroundColor: 'var(--color-surface-alt)',
                borderRadius: 'var(--radius-xl)',
                padding: '2.5rem 1.5rem',
                textAlign: 'center',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                {isOverdue ? 'TIME EXPIRED' : 'TIME REMAINING'}
              </div>
              <div
                style={{
                  fontSize: '3.5rem',
                  fontFamily: 'monospace',
                  fontWeight: 900,
                  color: isOverdue ? 'var(--color-danger)' : 'var(--color-primary)',
                  letterSpacing: '0.04em',
                }}
              >
                {formatSecondsToTime(secondsRemaining)}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                {isOverdue
                  ? 'Please confirm you are safe immediately.'
                  : 'Timer counts down automatically.'}
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <Card style={{ marginBottom: '2rem', padding: '2.5rem', textAlign: 'center' }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
            }}
          >
            <Clock size={30} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            No Active Journey Check-In
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', maxWidth: '440px', margin: '0 auto 1.5rem' }}>
            About to take a late cab, walk alone, or start a solo commute? Start a timed check-in to keep yourself safe.
          </p>
          <Button variant="primary" icon={Plus} onClick={() => setShowModal(true)}>
            Start New Check-In Timer
          </Button>
        </Card>
      )}

      {/* Check-In History Log */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <History size={20} color="var(--color-primary)" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Past Check-In History</h3>
        </div>

        {checkInHistory.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {checkInHistory.map((item) => (
              <Card key={item.id} className="card-hover" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{item.destination}</h4>
                      <Badge variant="success" icon={CheckCircle2}>
                        Completed Safe
                      </Badge>
                    </div>
                    {item.notes && (
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                        {item.notes}
                      </p>
                    )}
                  </div>

                  <div style={{ textAlign: 'right', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    <div>Started: {formatDateTime(item.startedAt)}</div>
                    <div>Safe arrival: {formatDateTime(item.completedAt)}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={History}
            title="No Check-In History Yet"
            description="Your completed safety check-ins will be logged here for your personal records."
          />
        )}
      </div>

      {/* Start Modal */}
      <StartCheckInModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default CheckInPage;
