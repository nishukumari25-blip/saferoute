import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Shield,
  LayoutDashboard,
  Users,
  AlertOctagon,
  MapPin,
  Clock,
  BookOpen,
  User,
  Settings,
  X,
  ExternalLink,
  PhoneCall,
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { isSosActive, contacts, activeCheckIn } = useEmergency();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    {
      name: 'Emergency SOS',
      path: '/sos',
      icon: AlertOctagon,
      isDanger: true,
      badge: isSosActive ? 'ALERT' : null,
    },
    {
      name: 'Trusted Contacts',
      path: '/contacts',
      icon: Users,
      badge: contacts?.length ? `${contacts.length}` : null,
    },
    {
      name: 'Location Sharing',
      path: '/location',
      icon: MapPin,
    },
    {
      name: 'Safety Check-In',
      path: '/check-in',
      icon: Clock,
      badge: activeCheckIn ? 'Active' : null,
    },
    {
      name: 'Emergency Resources',
      path: '/resources',
      icon: BookOpen,
    },
  ];

  const secondaryNavItems = [
    { name: 'My Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/dashboard" className="brand-logo" onClick={onClose}>
            <div className="brand-icon-wrapper">
              <Shield size={22} />
            </div>
            <span>SafeRoute</span>
          </Link>
          <button
            onClick={onClose}
            className="btn-icon"
            style={{ display: isOpen ? 'flex' : 'none' }}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-nav">
          <span className="nav-section-title">Safety Core</span>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''} ${item.isDanger ? 'sos-link' : ''}`
                }
                onClick={onClose}
              >
                <Icon className="nav-icon" />
                <span style={{ flex: 1 }}>{item.name}</span>
                {item.badge && (
                  <span
                    className={`badge ${
                      item.isDanger ? 'badge-danger' : item.badge === 'Active' ? 'badge-warning' : 'badge-primary'
                    }`}
                    style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          <div style={{ margin: '1rem 0 0.5rem' }}>
            <span className="nav-section-title">Preferences</span>
          </div>

          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <Icon className="nav-icon" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          {/* Quick Helpline Box */}
          <div
            style={{
              marginTop: 'auto',
              padding: '1rem',
              backgroundColor: 'var(--color-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid #FBCFE8',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <PhoneCall size={16} color="var(--color-secondary-text)" />
              <strong style={{ fontSize: '0.85rem', color: 'var(--color-secondary-text)' }}>
                National Helpline
              </strong>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#831843', marginBottom: '0.6rem' }}>
              Dial <strong>112</strong> for immediate police, fire, or ambulance dispatch.
            </p>
            <a
              href="tel:112"
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', textDecoration: 'none', background: '#FFFFFF' }}
            >
              Call 112 Now
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
