import React from 'react';
import { PhoneCall, ShieldAlert, Heart, Lock } from 'lucide-react';
import { VERIFIED_HELPLINES } from '../../utils/constants';

export const HelplineQuickBar = () => {
  // Focus on top verified essential hotlines
  const primaryNumbers = [
    { name: '112 ERSS', sub: 'Police / Fire / Ambulance', phone: '112', bg: '#FEE2E2', text: '#991B1B' },
    { name: '1091 Women Line', sub: 'Immediate Police SOS', phone: '1091', bg: '#FCE7F3', text: '#9D174D' },
    { name: '181 NCW Helpline', sub: 'Women In Distress', phone: '181', bg: '#ECE8FC', text: '#4325a7' },
    { name: '1930 Cyber Fraud', sub: 'Harassment & Safety', phone: '1930', bg: '#DBEAFE', text: '#1E40AF' },
  ];

  return (
    <div style={{ margin: '2rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PhoneCall size={18} color="var(--color-primary)" />
          Verified Emergency Helplines (1-Tap Call)
        </h3>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Official Government Numbers</span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
        }}
      >
        {primaryNumbers.map((item) => (
          <a
            key={item.phone}
            href={`tel:${item.phone}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              textDecoration: 'none',
              transition: 'all var(--transition-fast)',
              boxShadow: 'var(--shadow-sm)',
            }}
            className="card-hover"
          >
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.25rem', color: item.text }}>
                {item.name}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                {item.sub}
              </div>
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: item.bg,
                color: item.text,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PhoneCall size={16} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default HelplineQuickBar;
