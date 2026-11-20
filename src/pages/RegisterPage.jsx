import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Mail, Phone, Lock, UserPlus, Heart, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';
import { validateEmail, validatePhoneNumber } from '../utils/formatters';

export const RegisterPage = () => {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    bloodGroup: 'B+',
    emergencyNotes: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!validateEmail(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (!validatePhoneNumber(formData.phone)) {
      errs.phone = 'Please enter a valid phone number (e.g. +91 98765 43210).';
    }
    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
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

    setIsLoading(true);
    setTimeout(() => {
      const res = register(formData);
      setIsLoading(false);

      if (res.success) {
        toast.success(`Welcome to SafeRoute, ${res.user.name}! Your account is active.`);
        navigate('/dashboard');
      } else {
        setErrors({ form: res.message });
        toast.error(res.message);
      }
    }, 400);
  };

  return (
    <div className="card" style={{ padding: '2.5rem', boxShadow: 'var(--shadow-lg)' }}>
      <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.4rem' }}>
          Create Your SafeRoute Account
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          Set up your personal safety circle in less than a minute.
        </p>
      </div>

      {errors.form && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--color-danger-light)',
            color: 'var(--color-danger-dark)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.25rem',
            fontSize: '0.85rem',
          }}
        >
          <AlertCircle size={18} />
          <span>{errors.form}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="reg-name">
            <User size={16} /> Full Name *
          </label>
          <input
            id="reg-name"
            name="name"
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="e.g. Maya Iyer"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="reg-email">
            <Mail size={16} /> Email Address *
          </label>
          <input
            id="reg-email"
            name="email"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="maya@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label className="form-label" htmlFor="reg-phone">
            <Phone size={16} /> Primary Mobile Phone *
          </label>
          <input
            id="reg-phone"
            name="phone"
            type="tel"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>

        {/* Password Grid */}
        <div className="grid-2">
          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">
              <Lock size={16} /> Password *
            </label>
            <input
              id="reg-password"
              name="password"
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-confirm">
              <Lock size={16} /> Confirm Password *
            </label>
            <input
              id="reg-confirm"
              name="confirmPassword"
              type="password"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
          </div>
        </div>

        {/* Blood Group */}
        <div className="form-group">
          <label className="form-label" htmlFor="reg-blood">
            <Heart size={16} /> Blood Group (Emergency Medical Info)
          </label>
          <select
            id="reg-blood"
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

        <Button
          type="submit"
          variant="primary"
          icon={UserPlus}
          loading={isLoading}
          style={{ width: '100%', marginTop: '0.75rem', padding: '0.8rem' }}
        >
          Create My Account
        </Button>
      </form>

      <div style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
