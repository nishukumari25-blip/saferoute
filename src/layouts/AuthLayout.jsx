import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Shield, CheckCircle2, Lock, PhoneCall, HeartHandshake } from 'lucide-react';

export const AuthLayout = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        backgroundColor: 'var(--color-bg)',
      }}
      className="auth-layout-container"
    >
      {/* Left / Feature Column */}
      <div
        style={{
          background: 'linear-gradient(135deg, #4325a7 0%, #6C4CE3 50%, #8B5CF6 100%)',
          color: '#FFFFFF',
          padding: '3.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="auth-feature-panel"
      >
        {/* Subtle decorative circles */}
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            top: '-100px',
            right: '-100px',
            pointerEvents: 'none',
          }}
        />

        <div>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: '1.5rem',
              fontFamily: 'var(--font-heading)',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Shield size={24} />
            </div>
            <span>SafeRoute</span>
          </Link>

          <div style={{ marginTop: '3.5rem' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '0.35rem 0.85rem',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                marginBottom: '1rem',
              }}
            >
              Women's Everyday Safety Platform
            </span>
            <h1
              style={{
                fontSize: '2.5rem',
                lineHeight: 1.2,
                color: '#FFFFFF',
                marginBottom: '1.25rem',
                fontWeight: 800,
              }}
            >
              Your trusted companion for every step of your journey.
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6 }}>
              Instant SOS broadcasts to trusted contacts, safety check-in countdown timers, verified
              emergency helplines, and browser geolocation sharing without intrusive tracking.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle2 size={20} color="#FCE7F3" />
            <span style={{ fontSize: '0.95rem' }}>100% Client-Side Private Storage & Secure Session</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle2 size={20} color="#FCE7F3" />
            <span style={{ fontSize: '0.95rem' }}>One-Tap Emergency SOS Simulation with Audible Siren</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle2 size={20} color="#FCE7F3" />
            <span style={{ fontSize: '0.95rem' }}>Official National and State Emergency Helplines (112, 1091)</span>
          </div>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.65)' }}>
          © 2026 SafeRoute Companion. Prioritizing safety, autonomy, and speed.
        </div>
      </div>

      {/* Right / Form Column */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2.5rem',
        }}
      >
        <div style={{ width: '100%', maxWidth: '440px' }}>
          <Outlet />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .auth-layout-container {
            grid-template-columns: 1fr !important;
          }
          .auth-feature-panel {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthLayout;
