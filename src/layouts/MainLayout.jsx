import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import MobileNav from '../components/common/MobileNav';
import { useEmergency } from '../context/EmergencyContext';
import { AlertTriangle, X } from 'lucide-react';
import Button from '../components/common/Button';

export const MainLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { isSosActive, cancelSos } = useEmergency();

  return (
    <div className="app-layout">
      {/* Active SOS High-Visibility Alert Banner across the entire top of the viewport */}
      {isSosActive && (
        <aside
          className="sos-active-banner"
          aria-label="Active emergency broadcast status"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 110,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertTriangle className="animate-bounce" size={22} />
            <div>
              <strong style={{ fontSize: '0.95rem' }}>EMERGENCY SOS ALERT ACTIVATED</strong>
              <span style={{ fontSize: '0.82rem', opacity: 0.9, marginLeft: '0.5rem' }}>
                Simulated alert dispatched to emergency contacts.
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link to="/sos">
              <Button variant="secondary" size="sm" style={{ fontWeight: 700 }}>
                View Alert Details
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              style={{ background: 'white', color: '#DC2626', borderColor: 'white' }}
              onClick={cancelSos}
            >
              Cancel Alert
            </Button>
          </div>
        </aside>
      )}

      {/* Main Sidebar */}
      <Sidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Viewport */}
      <div
        className="main-content"
        style={{
          marginTop: isSosActive ? '50px' : '0',
          transition: 'margin-top 200ms ease',
        }}
      >
        <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

        <main className="page-container">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
};

export default MainLayout;
