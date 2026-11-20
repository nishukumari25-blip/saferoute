import React from 'react';
import { MapPin, Copy, Navigation, ExternalLink, RefreshCw } from 'lucide-react';
import Card, { CardHeader } from '../common/Card';
import Button from '../common/Button';
import useGeolocation from '../../hooks/useGeolocation';
import { formatCoordinates, getGoogleMapsUrl } from '../../utils/formatters';

export const LocationWidget = () => {
  const { location, loading, getCurrentPosition, copyLocationLink } = useGeolocation();

  return (
    <Card className="card-hover">
      <CardHeader
        title="Live Location Status"
        subtitle="Browser Geolocation API"
        icon={MapPin}
        action={
          <Button
            variant="ghost"
            size="sm"
            icon={RefreshCw}
            loading={loading}
            onClick={() => getCurrentPosition(true)}
            aria-label="Refresh current location"
          >
            Refresh
          </Button>
        }
      />

      <div style={{ marginTop: '0.5rem' }}>
        {location ? (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--color-surface-alt)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1rem',
              }}
            >
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>
                  Coordinates ({location.isSimulated ? 'Demo Fallback' : 'GPS Device'})
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--color-text-main)' }}>
                  {formatCoordinates(location.latitude, location.longitude)}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '0.15rem' }}>
                  Accuracy: ±{location.accuracy} meters
                </div>
              </div>

              <a
                href={getGoogleMapsUrl(location.latitude, location.longitude)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
                style={{ textDecoration: 'none' }}
              >
                <ExternalLink size={14} />
                <span>Maps</span>
              </a>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                variant="outline"
                size="sm"
                icon={Copy}
                onClick={copyLocationLink}
                style={{ flex: 1 }}
              >
                Copy Location Link
              </Button>
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: '1.25rem',
              backgroundColor: 'var(--color-surface-alt)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.85rem' }}>
              Location has not been retrieved yet. Tap below to fetch your current GPS coordinates.
            </p>
            <Button
              variant="primary"
              size="sm"
              icon={Navigation}
              loading={loading}
              onClick={() => getCurrentPosition(true)}
            >
              Get My Location
            </Button>
          </div>
        )}

        <div style={{ marginTop: '0.85rem', fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
          🔒 On-demand browser API. No background tracking or continuous battery drain.
        </div>
      </div>
    </Card>
  );
};

export default LocationWidget;
