'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { useTranslations } from 'next-intl';
import 'leaflet/dist/leaflet.css';

// Globale Leaflet-Styles für Marker-Icons
if (typeof window !== 'undefined') {
  // Nur im Browser ausführen
  const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
  const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
  const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';
  
  // Globale Styles für Leaflet-Icons
  const style = document.createElement('style');
  style.innerHTML = `
    .leaflet-marker-icon { 
      background-image: url(${iconUrl});
      background-size: contain;
    }
    .leaflet-retina .leaflet-marker-icon { 
      background-image: url(${iconRetinaUrl});
    }
    .leaflet-marker-shadow {
      background-image: url(${shadowUrl});
    }
  `;
  document.head.appendChild(style);
}

// Fix Leaflet icon issues
const fixLeafletIcon = () => {
  // Fix for default icon paths
  delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
};

export interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  ip: string;
  timezone: string;
  isFallback: boolean;
}

interface MapProps {
  onLocationUpdate: (data: LocationData) => void;
}

export default function Map({ onLocationUpdate }: MapProps) {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations();

  useEffect(() => {
    // Fix Leaflet icon issues
    fixLeafletIcon();

    // Get user's location using browser's Geolocation API with fallback to IP-based geolocation
    const getLocation = () => {
      setLoading(true);
      
      // Try browser geolocation first (more accurate)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          // Success callback
          async (position) => {
            try {
              // Get city and country from reverse geocoding
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=10`
              );
              
              if (!response.ok) {
                throw new Error('Failed to fetch location data');
              }
              
              const data = await response.json();
              const address = data.address || {};
              
              // Get IP for consistency with fallback method
              const ipResponse = await fetch('https://ipapi.co/json/');
              const ipData = await ipResponse.json();
              
              const locationData = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                city: address.city || address.town || address.village || address.hamlet || 'Unknown',
                country: address.country || 'Unknown',
                ip: ipData.ip || 'Unknown',
                timezone: ipData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
                isFallback: false
              };
              
              setLocation(locationData);
              onLocationUpdate(locationData);
            } catch (err) {
              console.error('Error with reverse geocoding:', err);
              // Fall back to IP geolocation
              await fallbackToIpGeolocation();
            } finally {
              setLoading(false);
            }
          },
          // Error callback - fall back to IP geolocation
          async (error) => {
            console.warn('Geolocation error, falling back to IP geolocation:', error);
            // If permission denied, show a message
            if (error.code === 1) { // PERMISSION_DENIED
              setError(t('locationPermission'));
            }
            await fallbackToIpGeolocation();
          },
          // Options
          { 
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0 
          }
        );
      } else {
        // Browser doesn't support Geolocation API
        fallbackToIpGeolocation();
      }
    };

    // Fallback to IP-based geolocation
    const fallbackToIpGeolocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        const data = await response.json();
        
        const locationData = {
          latitude: data.latitude,
          longitude: data.longitude,
          city: data.city || 'Unknown',
          country: data.country_name || 'Unknown',
          ip: data.ip || 'Unknown',
          timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
          isFallback: true
        };
        
        setLocation(locationData);
        onLocationUpdate(locationData);
      } catch (err) {
        console.error('Error fetching location:', err);
        setError(t('locationNotFound'));
      } finally {
        setLoading(false);
      }
    };

    getLocation();
  }, [t, onLocationUpdate]);

  // Initialisiere Leaflet-Icons beim ersten Laden
  useEffect(() => {
    fixLeafletIcon();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-[500px] bg-gray-100 dark:bg-gray-700 rounded-lg">{t('loading')}</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[500px] bg-gray-100 dark:bg-gray-700 rounded-lg text-red-500 p-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      {location && (
        <MapContainer 
          center={[location.latitude, location.longitude]} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>
              {location.city}, {location.country}
            </Popup>
          </Marker>
          <ZoomControl position="bottomleft" />
        </MapContainer>
      )}
    </div>
  );
}
