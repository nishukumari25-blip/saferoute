import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, AlertOctagon, MapPin, Clock } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const MobileNav = () => {
  const { isSosActive } = useEmergency();

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <NavLink
        to="/dashboard"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <LayoutDashboard size={20} />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/contacts"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <Users size={20} />
        <span>Contacts</span>
      </NavLink>

      <NavLink
        to="/sos"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
        style={{
          color: isSosActive ? 'var(--color-danger)' : undefined,
          fontWeight: '700',
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            backgroundColor: 'var(--color-danger)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -16,
            boxShadow: '0 4px 10px rgba(239, 68, 68, 0.4)',
          }}
        >
          <AlertOctagon size={22} />
        </div>
        <span>SOS</span>
      </NavLink>

      <NavLink
        to="/location"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <MapPin size={20} />
        <span>Location</span>
      </NavLink>

      <NavLink
        to="/check-in"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <Clock size={20} />
        <span>Check-In</span>
      </NavLink>
    </nav>
  );
};

export default MobileNav;
