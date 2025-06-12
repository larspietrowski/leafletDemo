'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { useTranslations } from 'next-intl';
import 'leaflet/dist/leaflet.css';

// Globale Leaflet-Styles für Marker-Icons
if (typeof window !== 'undefined') {
  // Nur im Browser ausführen - verbesserte Icon-URLs
  const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
  const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
  const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';
  
  // Globale Styles für Leaflet-Icons
  if (!document.querySelector('#leaflet-fix-styles')) {
    const style = document.createElement('style');
    style.id = 'leaflet-fix-styles';
    style.innerHTML = `
      .leaflet-container {
        height: 100% !important;
        width: 100% !important;
      }
      .leaflet-marker-icon { 
        background-image: url(${iconUrl}) !important;
        background-size: contain !important;
      }
      .leaflet-retina .leaflet-marker-icon { 
        background-image: url(${iconRetinaUrl}) !important;
      }
      .leaflet-marker-shadow {
        background-image: url(${shadowUrl}) !important;
      }
    `;
    document.head.appendChild(style);
  }
}

// Fix Leaflet icon issues
const fixLeafletIcon = () => {
  if (typeof window === 'undefined') return;
  
  try {
    // Fix for default icon paths
    delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  } catch (error) {
    console.warn('Failed to fix Leaflet icons:', error);
  }
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
  const [isInitialized, setIsInitialized] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    // Verhindere mehrfache Ausführung
    if (isInitialized) return;
    
    // Fix Leaflet icon issues
    fixLeafletIcon();

    // Get user's location using browser's Geolocation API with fallback to default location
    const getLocation = () => {
      setLoading(true);
      setIsInitialized(true);
      
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
              
              const locationData = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                city: address.city || address.town || address.village || address.hamlet || 'Unknown',
                country: address.country || 'Unknown',
                ip: 'Browser Geolocation',
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                isFallback: false
              };
              
              setLocation(locationData);
              onLocationUpdate(locationData);
              setLoading(false);
            } catch (err) {
              console.error('Error with reverse geocoding:', err);
              // Fall back to default location
              setDefaultLocation();
            }
          },
          // Error callback - fall back to default location
          (error) => {
            console.warn('Geolocation error, using default location:', error);
            setDefaultLocation();
          },
          // Options
          { 
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 60000 
          }
        );
      } else {
        // Browser doesn't support Geolocation API
        setDefaultLocation();
      }
    };

    // Set default location (Berlin) as fallback
    const setDefaultLocation = () => {
      console.log('Using default location (Berlin)');
      const defaultLocation = {
        latitude: 52.5200,
        longitude: 13.4050,
        city: 'Berlin',
        country: 'Deutschland',
        ip: 'Default Location',
        timezone: 'Europe/Berlin',
        isFallback: true
      };
      
      setLocation(defaultLocation);
      onLocationUpdate(defaultLocation);
      setLoading(false);
    };

    getLocation();
  }, [isInitialized]);

  // Initialisiere Leaflet-Icons beim ersten Laden
  useEffect(() => {
    fixLeafletIcon();
  }, []);

  // Force re-render der Karte wenn location gesetzt wird
  useEffect(() => {
    if (location) {
      // Kleine Verzögerung um sicherzustellen, dass die Karte korrekt gerendert wird
      const timer = setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  if (loading) {
    return <div className="flex justify-center items-center h-[500px] bg-gray-100 dark:bg-gray-700 rounded-lg">{t('loading')}</div>;
  }

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      {location ? (
        <MapContainer 
          key={`${location.latitude}-${location.longitude}`}
          center={[location.latitude, location.longitude]} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={true}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>
              {location.city}, {location.country}
              <br />
              <small>Lat: {location.latitude.toFixed(4)}, Lng: {location.longitude.toFixed(4)}</small>
            </Popup>
          </Marker>
          <ZoomControl position="bottomleft" />
        </MapContainer>
      ) : (
        <div className="flex justify-center items-center h-[500px] bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-gray-600 dark:text-gray-300">Standort wird geladen...</p>
        </div>
      )}
    </div>
  );
}
