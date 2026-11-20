import React, { useState } from 'react';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import SosQuickCard from '../components/dashboard/SosQuickCard';
import LocationWidget from '../components/dashboard/LocationWidget';
import CheckInWidget from '../components/dashboard/CheckInWidget';
import ContactsOverviewWidget from '../components/dashboard/ContactsOverviewWidget';
import RecentActivityWidget from '../components/dashboard/RecentActivityWidget';
import HelplineQuickBar from '../components/dashboard/HelplineQuickBar';
import StartCheckInModal from '../components/checkin/StartCheckInModal';
import ContactFormModal from '../components/contacts/ContactFormModal';
import { useEmergency } from '../context/EmergencyContext';

export const DashboardPage = () => {
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const { addContact } = useEmergency();

  const handleAddContact = (contactData) => {
    addContact(contactData);
  };

  return (
    <div>
      {/* 1. Welcome User Banner */}
      <WelcomeBanner
        onStartCheckIn={() => setShowCheckInModal(true)}
      />

      {/* 2. Primary 2-Column Hero Grid: SOS Action Card + Live Check-In Widget */}
      <div className="grid-dashboard-hero" style={{ marginBottom: '1.75rem' }}>
        <SosQuickCard />
        <CheckInWidget
          onOpenStartModal={() => setShowCheckInModal(true)}
        />
      </div>

      {/* 3. 1-Tap Emergency Helpline Fast Strip */}
      <HelplineQuickBar />

      {/* 4. Secondary Grid: Location Status + Trusted Contacts + Recent Activity */}
      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <LocationWidget />
        <ContactsOverviewWidget
          onAddContact={() => setShowContactModal(true)}
        />
        <RecentActivityWidget />
      </div>

      {/* Modals */}
      <StartCheckInModal
        isOpen={showCheckInModal}
        onClose={() => setShowCheckInModal(false)}
      />

      <ContactFormModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        onSubmit={handleAddContact}
      />
    </div>
  );
};

export default DashboardPage;
