import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Shield,
  AlertOctagon,
  Users,
  MapPin,
  Clock,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  Heart,
  Lock,
} from 'lucide-react';
import Button from '../components/common/Button';

export const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header Navigation */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 2.5rem',
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <Link to="/" className="brand-logo">
          <div className="brand-icon-wrapper">
            <Shield size={22} />
          </div>
          <span>SafeRoute</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="primary" icon={ArrowRight} iconPosition="right">
                Open Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          padding: '4.5rem 1.5rem',
          maxWidth: '1100px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-secondary-text)',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
          }}
        >
          <Heart size={16} />
          <span>Built for Women's Safety, Independence & Peace of Mind</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: 'var(--color-text-main)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}
        >
          Travel Confidently. <br />
          <span style={{ color: 'var(--color-primary)' }}>Your Safety Companion</span> Every Step.
        </h1>

        <p
          style={{
            fontSize: '1.2rem',
            color: 'var(--color-text-muted)',
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6,
          }}
        >
          Instant SOS emergency broadcasting, automated journey check-ins, trusted contact circles,
          and verified emergency helplines — accessible from any device.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to={isAuthenticated ? '/dashboard' : '/login'}>
            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
              {isAuthenticated ? 'Go to Safety Dashboard' : 'Explore Demo Dashboard'}
            </Button>
          </Link>

          <Link to="/resources">
            <Button variant="outline" size="lg" icon={PhoneCall}>
              View Emergency Helplines
            </Button>
          </Link>
        </div>

        {/* Feature Highlights Pills */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '3.5rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            <CheckCircle2 size={18} color="#10B981" /> No App Download Required
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            <CheckCircle2 size={18} color="#10B981" /> 100% Client-Side Privacy
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            <CheckCircle2 size={18} color="#10B981" /> Works in Any Modern Browser
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section style={{ backgroundColor: 'var(--color-surface)', padding: '4.5rem 1.5rem', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Comprehensive Safety Tools at Your Fingertips
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto' }}>
              Designed intentionally for high-stress situations with instant accessibility and zero clutter.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {/* 1. SOS Emergency */}
            <div className="card card-hover" style={{ padding: '2rem' }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-danger-light)',
                  color: 'var(--color-danger)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <AlertOctagon size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Instant SOS Emergency
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.93rem', lineHeight: 1.6 }}>
                Trigger immediate simulated alerts with a loud deterrent siren and your current GPS fix. Includes a 5-second countdown to avoid false alarms.
              </p>
            </div>

            {/* 2. Safety Check-In */}
            <div className="card card-hover" style={{ padding: '2rem' }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Clock size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Automated Safety Check-In
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.93rem', lineHeight: 1.6 }}>
                Set an expected arrival time whenever you take a cab, walk late, or travel alone. If overdue, SafeRoute flags your status prominently.
              </p>
            </div>

            {/* 3. Trusted Contacts */}
            <div className="card card-hover" style={{ padding: '2rem' }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-secondary-text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Users size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Trusted Emergency Circle
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.93rem', lineHeight: 1.6 }}>
                Manage close friends and family contacts with 1-tap phone calling and automated SMS alert dispatch templates.
              </p>
            </div>

            {/* 4. On-Demand Location */}
            <div className="card card-hover" style={{ padding: '2rem' }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '12px',
                  backgroundColor: '#DBEAFE',
                  color: '#1E40AF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <MapPin size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Browser Geolocation Sharing
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.93rem', lineHeight: 1.6 }}>
                Access live coordinates and copy shareable Google Maps links on-demand. Transparent, battery-friendly, and no invasive tracking.
              </p>
            </div>

            {/* 5. Verified Helplines */}
            <div className="card card-hover" style={{ padding: '2rem' }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '12px',
                  backgroundColor: '#D1FAE5',
                  color: '#065F46',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <PhoneCall size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Verified Official Helplines
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.93rem', lineHeight: 1.6 }}>
                Instant access to National Emergency (112), Women Helpline (1091), NCW (181), and Cyber Crime (1930) with direct click-to-call links.
              </p>
            </div>

            {/* 6. Client-Side Privacy */}
            <div className="card card-hover" style={{ padding: '2rem' }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '12px',
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Lock size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Private & Secure By Design
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.93rem', lineHeight: 1.6 }}>
                All user data, contacts, and check-in logs reside securely in your browser's LocalStorage. No third-party data tracking or surveillance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: 'auto',
          padding: '2.5rem 1.5rem',
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Shield size={20} color="var(--color-primary)" />
            <strong style={{ fontSize: '1.1rem' }}>SafeRoute Companion</strong>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
            SafeRoute is a front-end web safety companion. In life-threatening emergencies, always dial official authorities (112 / 100) directly.
          </p>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>
            © 2026 SafeRoute. Dedicated to personal safety and empowerment.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
