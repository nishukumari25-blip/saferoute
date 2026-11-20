import React, { useState } from 'react';
import { Phone, MessageSquare, Edit2, Trash2, Star, ShieldCheck } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { sanitizePhoneForTel, getGoogleMapsUrl } from '../../utils/formatters';
import { useEmergency } from '../../context/EmergencyContext';

export const ContactCard = ({ contact, onEdit, onDelete, onSetPrimary }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { currentLocation } = useEmergency();

  // Create pre-filled SMS message link
  const createSmsUrl = () => {
    const phone = sanitizePhoneForTel(contact.phone);
    let msg = `SafeRoute Alert: Hi ${contact.name}, please check in on me.`;
    if (currentLocation) {
      msg += ` My location: ${getGoogleMapsUrl(currentLocation.latitude, currentLocation.longitude)}`;
    }
    return `sms:${phone}?body=${encodeURIComponent(msg)}`;
  };

  return (
    <Card className="card-hover" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: contact.isPrimary ? 'var(--color-primary-light)' : 'var(--color-secondary)',
              color: contact.isPrimary ? 'var(--color-primary)' : 'var(--color-secondary-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1.15rem',
            }}
          >
            {contact.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{contact.name}</h4>
              {contact.isPrimary && (
                <Badge variant="primary" icon={Star}>
                  Primary Contact
                </Badge>
              )}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              {contact.relation}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <Button
            variant="ghost"
            size="sm"
            icon={Edit2}
            onClick={() => onEdit(contact)}
            aria-label={`Edit ${contact.name}`}
          />
          {confirmDelete ? (
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(contact.id)}
              >
                Confirm
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              icon={Trash2}
              onClick={() => setConfirmDelete(true)}
              aria-label={`Delete ${contact.name}`}
            />
          )}
        </div>
      </div>

      <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-surface-alt)', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>Mobile Number:</span>
          <span style={{ fontWeight: 600 }}>{contact.phone}</span>
        </div>
        {contact.notes && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginTop: '0.35rem' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>Notes:</span>
            <span style={{ color: 'var(--color-text-main)', textAlign: 'right' }}>{contact.notes}</span>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <a
          href={`tel:${sanitizePhoneForTel(contact.phone)}`}
          className="btn btn-primary btn-sm"
          style={{ flex: 1, textDecoration: 'none' }}
        >
          <Phone size={14} />
          <span>Call Now</span>
        </a>

        <a
          href={createSmsUrl()}
          className="btn btn-outline btn-sm"
          style={{ flex: 1, textDecoration: 'none' }}
        >
          <MessageSquare size={14} />
          <span>Send SMS</span>
        </a>

        {!contact.isPrimary && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSetPrimary(contact.id)}
            title="Make Primary Contact"
          >
            Make Primary
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ContactCard;
