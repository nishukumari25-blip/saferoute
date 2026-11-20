import { useState, useEffect, useCallback, useRef } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { useToast } from '../context/ToastContext';
import { getGoogleMapsUrl } from '../utils/formatters';

export const useGeolocation = () => {
  const { currentLocation, setCurrentLocation, isLocationSharing, setIsLocationSharing } = useEmergency();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionState, setPermissionState] = useState('prompt'); // 'prompt' | 'granted' | 'denied'
  const watchIdRef = useRef(null);

  // Check initial permission status if available in navigator.permissions
  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((result) => {
          setPermissionState(result.state);
          result.onchange = () => {
            setPermissionState(result.state);
          };
        })
        .catch(() => {
          // Ignore if permission query fails
        });
    }
  }, []);

  // Request high accuracy location
  const getCurrentPosition = useCallback(
    (showToast = true) => {
      if (!navigator.geolocation) {
        const fallbackLocation = {
          latitude: 12.9716,
          longitude: 77.5946,
          accuracy: 50,
          timestamp: Date.now(),
          addressText: 'Bengaluru, Karnataka (Simulated Desktop Fallback)',
          isSimulated: true,
        };
        setCurrentLocation(fallbackLocation);
        setError('Geolocation is not supported by your browser. Using approximate location.');
        if (showToast) toast.warning('Geolocation API not supported. Approximate city coordinates used.');
        return Promise.resolve(fallbackLocation);
      }

      setLoading(true);
      setError(null);

      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const loc = {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              accuracy: Math.round(pos.coords.accuracy),
              timestamp: pos.timestamp || Date.now(),
              speed: pos.coords.speed,
              heading: pos.coords.heading,
              altitude: pos.coords.altitude,
              isSimulated: false,
            };
            setCurrentLocation(loc);
            setLoading(false);
            setPermissionState('granted');
            if (showToast) toast.success('Location updated successfully.');
            resolve(loc);
          },
          (err) => {
            setLoading(false);
            let msg = 'Unable to fetch current location.';
            if (err.code === 1) {
              msg = 'Location permission denied by user. Check browser settings.';
              setPermissionState('denied');
            } else if (err.code === 2) {
              msg = 'Location unavailable or GPS signal weak.';
            } else if (err.code === 3) {
              msg = 'Location request timed out.';
            }

            // Provide realistic fallback so user can still test all features smoothly
            const fallbackLocation = {
              latitude: 12.9716,
              longitude: 77.5946,
              accuracy: 25,
              timestamp: Date.now(),
              addressText: 'Bengaluru, Karnataka (Simulated Demo Coordinates)',
              isSimulated: true,
            };
            setCurrentLocation(fallbackLocation);
            setError(msg);
            if (showToast) toast.info(`${msg} Demo location provided for testing.`);
            resolve(fallbackLocation);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 30000,
          }
        );
      });
    },
    [setCurrentLocation, toast]
  );

  // Start sharing location
  const startSharing = useCallback(() => {
    setIsLocationSharing(true);
    getCurrentPosition(false);

    if (navigator.geolocation && navigator.geolocation.watchPosition) {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }

      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const loc = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: Math.round(pos.coords.accuracy),
            timestamp: pos.timestamp || Date.now(),
            isSimulated: false,
          };
          setCurrentLocation(loc);
        },
        (err) => {
          console.warn('Watch location error:', err);
        },
        { enableHighAccuracy: true, maximumAge: 10000 }
      );
    }

    toast.success('Live location session active on this tab.');
  }, [getCurrentPosition, setCurrentLocation, setIsLocationSharing, toast]);

  // Stop sharing location
  const stopSharing = useCallback(() => {
    setIsLocationSharing(false);
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    toast.info('Location sharing stopped.');
  }, [setIsLocationSharing, toast]);

  // Clean up watchPosition on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // One-click copy coordinates & Google Maps link to clipboard
  const copyLocationLink = useCallback(async () => {
    if (!currentLocation) {
      toast.warning('No location available to copy. Please fetch location first.');
      return false;
    }

    const mapLink = getGoogleMapsUrl(currentLocation.latitude, currentLocation.longitude);
    const textToCopy = `SafeRoute Emergency Alert: My current location is ${currentLocation.latitude.toFixed(5)}, ${currentLocation.longitude.toFixed(5)}.\nGoogle Maps: ${mapLink}`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      toast.success('Location and Google Maps link copied to clipboard!');
      return true;
    } catch {
      toast.error('Failed to copy to clipboard.');
      return false;
    }
  }, [currentLocation, toast]);

  return {
    location: currentLocation,
    loading,
    error,
    permissionState,
    isSharing: isLocationSharing,
    getCurrentPosition,
    startSharing,
    stopSharing,
    copyLocationLink,
  };
};

export default useGeolocation;
