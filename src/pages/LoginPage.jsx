import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Mail, Lock, LogIn, Sparkles, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';
import { validateEmail } from '../utils/formatters';

export const LoginPage = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleFillDemo = () => {
    setEmail('ananya@example.com');
    setPassword('password123');
    setErrors({});
    toast.info('Demo credentials populated.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    // Simulate snappy authentication delay
    setTimeout(() => {
      const res = login(email, password);
      setIsLoading(false);

      if (res.success) {
        toast.success(`Welcome back, ${res.user.name}!`);
        navigate(from, { replace: true });
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
          Welcome Back
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          Sign in to access your SafeRoute safety circle and emergency tools.
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

      {/* Quick Autofill Demo Helper Button */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button
          type="button"
          onClick={handleFillDemo}
          style={{
            width: '100%',
            padding: '0.6rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-secondary-text)',
            border: '1px dashed #F472B6',
            fontWeight: 600,
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            transition: 'background var(--transition-fast)',
          }}
        >
          <Sparkles size={16} />
          <span>Auto-fill Demo Credentials (ananya@example.com)</span>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="login-email">
            <Mail size={16} /> Email Address
          </label>
          <input
            id="login-email"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
            }}
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="form-label" htmlFor="login-password">
            <Lock size={16} /> Password
          </label>
          <input
            id="login-password"
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
            }}
          />
          {errors.password && <span className="form-error">{errors.password}</span>}
        </div>

        <Button
          type="submit"
          variant="primary"
          icon={LogIn}
          loading={isLoading}
          style={{ width: '100%', marginTop: '0.5rem', padding: '0.8rem' }}
        >
          Sign In
        </Button>
      </form>

      <div style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
        Don't have an account yet?{' '}
        <Link to="/register" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
