import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { User, Phone, Tag, FileText, Check, AlertCircle } from 'lucide-react';
import { validatePhoneNumber } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

export const ContactFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relation: 'Friend',
    isPrimary: false,
    notes: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        phone: initialData.phone || '',
        relation: initialData.relation || 'Friend',
        isPrimary: Boolean(initialData.isPrimary),
        notes: initialData.notes || '',
      });
    } else {
      setFormData({
        name: '',
        phone: '',
        relation: 'Friend',
        isPrimary: false,
        notes: '',
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear field error on edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Contact name is required.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (!validatePhoneNumber(formData.phone)) {
      errs.phone = 'Please enter a valid phone number (e.g. +91 98765 43210 or 10 digits).';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the errors in the form.');
      return;
    }

    onSubmit(formData);
    toast.success(initialData ? 'Contact updated successfully!' : 'Emergency contact added!');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Emergency Contact' : 'Add Emergency Contact'}
      size="md"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {initialData ? 'Save Changes' : 'Add Contact'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="contact-name">
            <User size={16} /> Contact Full Name *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="e.g. Priya Sharma"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label" htmlFor="contact-phone">
            <Phone size={16} /> Mobile Phone Number *
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone ? (
            <span className="form-error">{errors.phone}</span>
          ) : (
            <span className="form-hint">Used for 1-tap phone calls and simulated SOS broadcast.</span>
          )}
        </div>

        {/* Relation */}
        <div className="form-group">
          <label className="form-label" htmlFor="contact-relation">
            <Tag size={16} /> Relationship
          </label>
          <select
            id="contact-relation"
            name="relation"
            className="form-select"
            value={formData.relation}
            onChange={handleChange}
          >
            <option value="Sister">Sister</option>
            <option value="Mother">Mother</option>
            <option value="Father">Father</option>
            <option value="Brother">Brother</option>
            <option value="Spouse / Partner">Spouse / Partner</option>
            <option value="Friend">Friend</option>
            <option value="Roommate">Roommate</option>
            <option value="Colleague">Colleague</option>
            <option value="Neighbor">Neighbor</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Notes */}
        <div className="form-group">
          <label className="form-label" htmlFor="contact-notes">
            <FileText size={16} /> Notes / Location Detail (Optional)
          </label>
          <input
            id="contact-notes"
            name="notes"
            type="text"
            className="form-control"
            placeholder="e.g. Lives in same building, keyholder"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        {/* Primary Contact Toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem',
            backgroundColor: 'var(--color-surface-alt)',
            borderRadius: 'var(--radius-md)',
            marginTop: '1rem',
          }}
        >
          <input
            id="contact-primary"
            name="isPrimary"
            type="checkbox"
            checked={formData.isPrimary}
            onChange={handleChange}
            style={{ width: 18, height: 18, cursor: 'pointer' }}
          />
          <label htmlFor="contact-primary" style={{ fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>
            Set as Primary Emergency Contact (First dialed on SOS)
          </label>
        </div>
      </form>
    </Modal>
  );
};

export default ContactFormModal;
