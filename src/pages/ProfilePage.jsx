import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Mail, Phone, MapPin, Heart, FileText, Save, LogOut } from 'lucide-react';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import { validatePhoneNumber, validateEmail } from '../utils/formatters';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bloodGroup: user?.bloodGroup || 'B+',
    emergencyNotes: user?.emergencyNotes || '',
    address: user?.address || '',
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name cannot be empty.';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix errors in profile form.');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      updateProfile(formData);
      setIsSaving(false);
      toast.success('Profile and medical notes updated successfully.');
    }, 300);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.info('You have logged out.');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.25rem' }}>
          Personal Safety Profile
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
          Information here is accessible during emergencies and included in alerts dispatched to contacts.
        </p>
      </div>

      {/* Avatar & Summary Card */}
      <Card style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
          alt={user?.name}
          style={{ width: 84, height: 84, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--color-primary-light)' }}
        />
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{user?.name}</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>{user?.email} • {user?.phone}</p>
          <div style={{ marginTop: '0.4rem', display: 'inline-block', padding: '0.2rem 0.6rem', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
            Blood Group: {user?.bloodGroup || 'Not specified'}
          </div>
        </div>

        <Button variant="outline" size="sm" icon={LogOut} onClick={handleLogout}>
          Sign Out
        </Button>
      </Card>

      {/* Form Card */}
      <Card>
        <CardHeader
          title="Edit Profile Details"
          subtitle="All fields stored locally on your device"
          icon={User}
        />

        <form onSubmit={handleSave}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="prof-name">
                <User size={16} /> Full Name
              </label>
              <input
                id="prof-name"
                name="name"
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prof-phone">
                <Phone size={16} /> Mobile Phone
              </label>
              <input
                id="prof-phone"
                name="phone"
                type="tel"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label" htmlFor="prof-email">
                <Mail size={16} /> Email Address (Read-Only)
              </label>
              <input
                id="prof-email"
                type="email"
                className="form-control"
                value={formData.email}
                disabled
                style={{ backgroundColor: 'var(--color-surface-alt)', cursor: 'not-allowed' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prof-blood">
                <Heart size={16} /> Blood Group
              </label>
              <select
                id="prof-blood"
                name="bloodGroup"
                className="form-select"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="prof-address">
              <MapPin size={16} /> Home / Primary Emergency Address
            </label>
            <input
              id="prof-address"
              name="address"
              type="text"
              className="form-control"
              placeholder="Flat / House number, Street, Landmark, City"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="prof-notes">
              <FileText size={16} /> Medical Allergies & Emergency Instructions
            </label>
            <textarea
              id="prof-notes"
              name="emergencyNotes"
              rows="3"
              className="form-control"
              placeholder="e.g. Asthmatic, carries inhaler. Allergic to penicillin. Emergency contact: Sister lives 10 mins away."
              value={formData.emergencyNotes}
              onChange={handleChange}
            />
            <span className="form-hint">
              This note is shared with emergency services and primary contacts during critical alerts.
            </span>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="primary" icon={Save} loading={isSaving}>
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;
