import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import Button from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary-light)',
          color: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <ShieldAlert size={40} />
      </div>

      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
        404 — Page Not Found
      </h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '460px', marginBottom: '2rem' }}>
        The safety screen you are looking for does not exist or has been moved.
      </p>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/dashboard">
          <Button variant="primary" icon={Home}>
            Go to Dashboard
          </Button>
        </Link>
        <Link to="/">
          <Button variant="outline" icon={ArrowLeft}>
            SafeRoute Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
