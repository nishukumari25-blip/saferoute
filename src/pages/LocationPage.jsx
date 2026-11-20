import React, { useState } from 'react';
import {
  MapPin,
  Share2,
  Copy,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Info,
  CheckCircle2,
} from 'lucide-react';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import LocationShareCard from '../components/location/LocationShareCard';
import useGeolocation from '../hooks/useGeolocation';
import { formatCoordinates, getGoogleMapsUrl } from '../utils/formatters';

export const LocationPage = () => {
  const { location, loading, getCurrentPosition, isSharing } = useGeolocation();

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.25rem' }}>
          Location Sharing & Privacy Control
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
          Fetch and share your GPS coordinates on-demand with zero persistent background tracking.
        </p>
      </div>

      {/* Main Location Sharing Card Component */}
      <div style={{ marginBottom: '2rem' }}>
        <LocationShareCard />
      </div>

      {/* Interactive Map Visualizer & Privacy Guarantees */}
      <div className="grid-2">
        {/* Map Preview */}
        <Card>
          <CardHeader
            title="Map Positioning Preview"
            subtitle="OpenStreetMap dynamic tile view"
            icon={MapPin}
          />

          {location ? (
            <div>
              <div
                style={{
                  width: '100%',
                  height: '280px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  marginBottom: '1rem',
                  position: 'relative',
                }}
              >
                {/* Embed OpenStreetMap iframe */}
                <iframe
                  title="Location Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 0.01}%2C${location.latitude - 0.01}%2C${location.longitude + 0.01}%2C${location.latitude + 0.01}&amp;layer=mapnik&amp;marker=${location.latitude}%2C${location.longitude}`}
                  style={{ border: 0 }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Target: {formatCoordinates(location.latitude, location.longitude)}
                </span>
                <a
                  href={getGoogleMapsUrl(location.latitude, location.longitude)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ textDecoration: 'none' }}
                >
                  <ExternalLink size={14} />
                  <span>Open Full Screen Map</span>
                </a>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: 'var(--color-text-muted)' }}>
              <MapPin size={36} style={{ margin: '0 auto 0.75rem', color: 'var(--color-primary)' }} />
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                Map preview will appear once location permission is granted.
              </p>
              <Button variant="primary" size="sm" onClick={() => getCurrentPosition(true)}>
                Detect My Location
              </Button>
            </div>
          )}
        </Card>

        {/* How SafeRoute Handles Geolocation & Privacy */}
        <Card>
          <CardHeader
            title="Geolocation Privacy Guarantees"
            subtitle="Transparent permissions breakdown"
            icon={ShieldCheck}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.92rem' }}>On-Demand Execution Only</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  GPS is read only when you explicitly tap "Get My Location", activate an SOS panic, or start an active session in this tab.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.92rem' }}>Zero Background Tracking</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  SafeRoute does not run hidden background services or battery-draining continuous location monitors. When you close the browser tab, all location queries cease immediately.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.92rem' }}>Local Client Storage</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Coordinates remain in your browser session memory. We do not transmit or sell user movement patterns to third-party ad networks.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LocationPage;
