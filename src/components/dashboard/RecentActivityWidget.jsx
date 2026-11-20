import React from 'react';
import { History, AlertTriangle, CheckCircle, Shield, Clock } from 'lucide-react';
import Card, { CardHeader } from '../common/Card';
import { useEmergency } from '../../context/EmergencyContext';
import { formatRelativeTime } from '../../utils/formatters';

export const RecentActivityWidget = () => {
  const { sosLogs, checkInHistory } = useEmergency();

  // Combine and sort recent events
  const activities = [
    ...sosLogs.map((log) => ({
      id: log.id,
      title: log.type || 'Emergency Broadcast Alert',
      time: log.timestamp,
      status: log.status,
      type: 'sos',
    })),
    ...checkInHistory.map((chk) => ({
      id: chk.id,
      title: `Check-In: ${chk.destination}`,
      time: chk.completedAt || chk.startedAt,
      status: chk.status === 'safe' ? 'Arrived Safely' : 'In Progress',
      type: 'checkin',
    })),
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);

  return (
    <Card className="card-hover">
      <CardHeader
        title="Recent Safety Activity"
        subtitle="Audit trail of check-ins and triggered alerts"
        icon={History}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {activities.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '1rem', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
            No recent activity recorded yet.
          </p>
        ) : (
          activities.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid var(--color-surface-alt)',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  backgroundColor:
                    item.type === 'sos' ? 'var(--color-danger-light)' : 'var(--color-success-light)',
                  color: item.type === 'sos' ? 'var(--color-danger)' : 'var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                {item.type === 'sos' ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--color-text-main)' }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
                    {formatRelativeTime(item.time)}
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Status: <strong>{item.status}</strong>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default RecentActivityWidget;
