import React, { useState } from 'react';
import { Users, UserPlus, Search, Phone, ShieldCheck, AlertCircle } from 'lucide-react';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import EmptyState from '../components/common/EmptyState';
import ContactCard from '../components/contacts/ContactCard';
import ContactFormModal from '../components/contacts/ContactFormModal';
import { useEmergency } from '../context/EmergencyContext';

export const ContactsPage = () => {
  const { contacts, addContact, updateContact, deleteContact, setPrimaryContact } = useEmergency();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const filteredContacts = contacts.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      (c.relation && c.relation.toLowerCase().includes(q))
    );
  });

  const handleOpenAdd = () => {
    setEditingContact(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingContact) {
      updateContact(editingContact.id, formData);
    } else {
      addContact(formData);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.25rem' }}>
            Trusted Emergency Contacts
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Manage the people alerted whenever you activate Emergency SOS or safety check-in triggers.
          </p>
        </div>

        <Button variant="primary" icon={UserPlus} onClick={handleOpenAdd}>
          Add New Contact
        </Button>
      </div>

      {/* Info Alert Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.85rem 1.25rem',
          backgroundColor: 'var(--color-primary-light)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-primary-dark)',
          marginBottom: '1.75rem',
          fontSize: '0.88rem',
        }}
      >
        <ShieldCheck size={20} style={{ flexShrink: 0 }} />
        <span>
          <strong>Pro-tip:</strong> Designate at least one <strong>Primary Contact</strong> who lives nearby or is reachable 24/7. SafeRoute puts them first on emergency broadcast lists.
        </span>
      </div>

      {/* Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-light)',
            }}
          />
          <input
            type="text"
            className="form-control"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search by name, relation or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          Showing {filteredContacts.length} of {contacts.length} contacts
        </span>
      </div>

      {/* Contacts Grid */}
      {filteredContacts.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={handleOpenEdit}
              onDelete={deleteContact}
              onSetPrimary={setPrimaryContact}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title={searchQuery ? 'No Matching Contacts Found' : 'Your Safety Circle is Empty'}
          description={
            searchQuery
              ? `No contacts matched "${searchQuery}". Clear your search or add a new contact.`
              : 'Add trusted friends, family members, or neighbors to your emergency contact circle.'
          }
          actionLabel="Add Emergency Contact"
          actionIcon={UserPlus}
          onAction={handleOpenAdd}
        />
      )}

      {/* Modal for Add / Edit */}
      <ContactFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingContact}
      />
    </div>
  );
};

export default ContactsPage;
