'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useTranslations } from 'next-intl';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon issues
const fixLeafletIcon = () => {
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
}

export default function SimpleMap() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations();

  useEffect(() => {
    // Fix Leaflet icon issues
    fixLeafletIcon();
    
    // Fallback position (Berlin)
    const fallbackLocation = {
      latitude: 52.5200,
      longitude: 13.4050,
      city: 'Berlin',
      country: 'Deutschland'
    };
    
    // Set fallback location
    setLocation(fallbackLocation);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-[500px] bg-gray-100 dark:bg-gray-700 rounded-lg">{t('loading')}</div>;
  }

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      {location && (
        <MapContainer 
          center={[location.latitude, location.longitude]} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
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
        </MapContainer>
      )}
    </div>
  );
}
