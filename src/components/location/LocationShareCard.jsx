import React from 'react';
import Card, { CardHeader } from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import {
  MapPin,
  Share2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Radio,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import useGeolocation from '../../hooks/useGeolocation';
import { formatCoordinates, getGoogleMapsUrl, formatDateTime } from '../../utils/formatters';

export const LocationShareCard = () => {
  const {
    location,
    loading,
    error,
    permissionState,
    isSharing,
    getCurrentPosition,
    startSharing,
    stopSharing,
    copyLocationLink,
  } = useGeolocation();

  return (
    <Card>
      <CardHeader
        title="Live Coordinates & Sharing Control"
        subtitle="HTML5 Geolocation API with real-time coordinate streaming"
        icon={MapPin}
        action={
          <Badge variant={isSharing ? 'success' : 'neutral'} icon={Radio}>
            {isSharing ? 'Session Active' : 'Idle'}
          </Badge>
        }
      />

      {/* Primary Coordinates Box */}
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: 'var(--color-surface-alt)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>
              Latitude
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
              {location ? location.latitude.toFixed(6) : '—'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>
              Longitude
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
              {location ? location.longitude.toFixed(6) : '—'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>
              Accuracy Radius
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10B981' }}>
              {location ? `±${location.accuracy} meters` : '—'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>
              Permission Status
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>
              {permissionState === 'granted' ? (
                <span style={{ color: '#10B981' }}>✓ Granted</span>
              ) : permissionState === 'denied' ? (
                <span style={{ color: '#EF4444' }}>✕ Blocked</span>
              ) : (
                <span style={{ color: '#F59E0B' }}>• Pending Prompt</span>
              )}
            </div>
          </div>
        </div>

        {location && (
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            Last GPS fix: {formatDateTime(new Date(location.timestamp).toISOString())}
            {location.isSimulated && ' (Simulated demo coordinates)'}
          </div>
        )}
      </div>

      {/* Sharing controls and links */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {isSharing ? (
          <Button variant="danger" onClick={stopSharing}>
            Stop Sharing Session
          </Button>
        ) : (
          <Button variant="primary" icon={Share2} onClick={startSharing}>
            Start Location Session
          </Button>
        )}

        <Button
          variant="outline"
          icon={Copy}
          onClick={copyLocationLink}
          disabled={!location}
        >
          Copy Coordinates & Maps Link
        </Button>

        {location && (
          <a
            href={getGoogleMapsUrl(location.latitude, location.longitude)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ textDecoration: 'none' }}
          >
            <ExternalLink size={16} />
            <span>Open in Google Maps</span>
          </a>
        )}
      </div>

      {/* Privacy Notice Banner */}
      <div
        style={{
          display: 'flex',
          gap: '0.85rem',
          padding: '1rem 1.25rem',
          backgroundColor: '#EFF6FF',
          border: '1px solid #BFDBFE',
          borderRadius: 'var(--radius-md)',
          color: '#1E40AF',
        }}
      >
        <ShieldCheck size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
          <strong>Zero Background Tracking Guarantee:</strong> SafeRoute uses the official browser Geolocation API strictly within your active tab. We do not run persistent background processes or battery-draining continuous location pinging without explicit consent.
        </div>
      </div>
    </Card>
  );
};

export default LocationShareCard;
