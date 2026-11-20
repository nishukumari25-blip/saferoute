import React from 'react';
import { Users, Phone, Star, Plus, Shield } from 'lucide-react';
import Card, { CardHeader } from '../common/Card';
import Button from '../common/Button';
import { useEmergency } from '../../context/EmergencyContext';
import { Link } from 'react-router-dom';
import { sanitizePhoneForTel } from '../../utils/formatters';

export const ContactsOverviewWidget = ({ onAddContact }) => {
  const { contacts } = useEmergency();

  return (
    <Card className="card-hover">
      <CardHeader
        title="Trusted Circle"
        subtitle={`${contacts.length} saved emergency contacts`}
        icon={Users}
        action={
          <Button variant="ghost" size="sm" icon={Plus} onClick={onAddContact}>
            Add
          </Button>
        }
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {contacts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--color-text-muted)' }}>
            <p style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>No emergency contacts saved yet.</p>
            <Button variant="primary" size="sm" icon={Plus} onClick={onAddContact}>
              Add First Contact
            </Button>
          </div>
        ) : (
          contacts.slice(0, 3).map((contact) => (
            <div
              key={contact.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--color-surface-alt)',
                borderRadius: 'var(--radius-md)',
                transition: 'background var(--transition-fast)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    backgroundColor: contact.isPrimary ? 'var(--color-primary-light)' : 'var(--color-border)',
                    color: contact.isPrimary ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                >
                  {contact.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{contact.name}</span>
                    {contact.isPrimary && (
                      <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                        Primary
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    {contact.relation} • {contact.phone}
                  </span>
                </div>
              </div>

              <a
                href={`tel:${sanitizePhoneForTel(contact.phone)}`}
                className="btn btn-primary btn-sm btn-icon"
                style={{ width: 34, height: 34, borderRadius: '50%', textDecoration: 'none' }}
                title={`Call ${contact.name}`}
                aria-label={`Call ${contact.name}`}
              >
                <Phone size={15} />
              </a>
            </div>
          ))
        )}

        {contacts.length > 3 && (
          <Link
            to="/contacts"
            style={{
              textAlign: 'center',
              fontSize: '0.82rem',
              fontWeight: 600,
              padding: '0.4rem',
              color: 'var(--color-primary)',
            }}
          >
            View all {contacts.length} contacts →
          </Link>
        )}
      </div>
    </Card>
  );
};

export default ContactsOverviewWidget;
