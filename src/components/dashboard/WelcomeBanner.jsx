import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useEmergency } from '../../context/EmergencyContext';
import { ShieldCheck, MapPin, Clock, Users, Plus, ChevronRight } from 'lucide-react';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

export const WelcomeBanner = ({ onStartCheckIn }) => {
  const { user } = useAuth();
  const { contacts, isSosActive, activeCheckIn, currentLocation } = useEmergency();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = user?.name ? user.name.split(' ')[0] : 'Friend';

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #6C4CE3 0%, #8B5CF6 100%)',
        color: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem 2.25rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background shape */}
      <div
        style={{
          position: 'absolute',
          right: '-40px',
          bottom: '-50px',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              padding: '0.3rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}
          >
            <ShieldCheck size={16} />
            <span>SafeRoute Active Shield</span>
          </div>

          <h2 style={{ fontSize: '1.85rem', color: '#FFFFFF', fontWeight: 800, marginBottom: '0.4rem' }}>
            {getGreeting()}, {firstName}!
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.95rem', maxWidth: '580px' }}>
            Your safety circle is active with {contacts.length} emergency contacts ready. Stay connected
            and commute with peace of mind.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Button
            variant="secondary"
            icon={Clock}
            onClick={onStartCheckIn}
            style={{ fontWeight: 700 }}
          >
            Start Check-In
          </Button>
          <Link to="/sos">
            <Button
              variant="danger"
              style={{ fontWeight: 700, border: '2px solid rgba(255,255,255,0.4)' }}
            >
              Emergency SOS
            </Button>
          </Link>
        </div>
      </div>

      {/* Mini Stats Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginTop: '1.75rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Link
          to="/contacts"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: '#FFFFFF',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Users size={18} />
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{contacts.length} Contacts</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              Emergency circle
            </div>
          </div>
        </Link>

        <Link
          to="/location"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: '#FFFFFF',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MapPin size={18} />
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              {currentLocation ? 'GPS Ready' : 'Location Idle'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              Tap to share
            </div>
          </div>
        </Link>

        <Link
          to="/check-in"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: '#FFFFFF',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Clock size={18} />
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              {activeCheckIn ? 'Active' : 'No Timer'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              Safety check-in
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default WelcomeBanner;
