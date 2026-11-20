import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEmergency } from '../../context/EmergencyContext';
import {
  Menu,
  Bell,
  AlertTriangle,
  MapPin,
  Clock,
  LogOut,
  User,
  Shield,
  ChevronDown,
} from 'lucide-react';
import Button from './Button';

export const Navbar = ({ onToggleMobileSidebar }) => {
  const { user, logout } = useAuth();
  const { isSosActive, activeCheckIn, currentLocation } = useEmergency();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="top-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onToggleMobileSidebar}
          className="btn-icon"
          style={{ display: 'none', background: 'var(--color-surface-alt)' }}
          aria-label="Toggle navigation menu"
          id="mobile-menu-toggle-btn"
        >
          <Menu size={20} />
        </button>

        {/* Status Indicators Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {isSosActive ? (
            <Link
              to="/sos"
              className="badge badge-danger"
              style={{ padding: '0.4rem 0.8rem', cursor: 'pointer' }}
            >
              <span className="status-dot red" />
              <strong>SOS ACTIVE ALERT</strong>
            </Link>
          ) : (
            <div className="badge badge-success" style={{ padding: '0.35rem 0.75rem' }}>
              <span className="status-dot green" />
              <span>System Armed & Safe</span>
            </div>
          )}

          {activeCheckIn && (
            <Link
              to="/check-in"
              className="badge badge-primary"
              style={{ padding: '0.35rem 0.75rem' }}
            >
              <Clock size={12} />
              <span>Check-in: {activeCheckIn.destination}</span>
            </Link>
          )}

          {currentLocation && (
            <Link
              to="/location"
              className="badge badge-neutral"
              style={{ padding: '0.35rem 0.75rem', display: 'none' }}
              id="navbar-loc-badge"
            >
              <MapPin size={12} />
              <span>GPS Connected</span>
            </Link>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Quick Emergency SOS button in navbar */}
        <Link to="/sos">
          <Button
            variant="danger"
            size="sm"
            icon={AlertTriangle}
            style={{ fontWeight: 700 }}
          >
            SOS Panic
          </Button>
        </Link>

        {/* User Mini Profile dropdown / info */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link
              to="/profile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.35rem 0.6rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-surface-alt)',
                color: 'var(--color-text-main)',
              }}
            >
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={user.name}
                style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover' }}
              />
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }} className="desktop-user-name">
                {user.name.split(' ')[0]}
              </span>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              icon={LogOut}
              onClick={handleLogout}
              title="Log out"
              aria-label="Log out of SafeRoute"
            />
          </div>
        ) : (
          <Link to="/login">
            <Button variant="primary" size="sm">
              Log In
            </Button>
          </Link>
        )}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #mobile-menu-toggle-btn {
            display: inline-flex !important;
          }
          .desktop-user-name {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
