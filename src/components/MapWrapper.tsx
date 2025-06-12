'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import LocationInfo from './LocationInfo';
import AboutSection from './AboutSection';
import { LocationData } from './Map';
import 'leaflet/dist/leaflet.css';

// Dynamisch importieren, um SSR-Probleme zu vermeiden
const SimpleMap = dynamic(() => import('./SimpleMap'), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-[500px] bg-gray-100 dark:bg-gray-700 rounded-lg">Lade Karte...</div>
});

export default function MapWrapper() {
  // Verwende einen festen Standort für die Demo
  const [locationData] = useState<LocationData>({
    latitude: 52.5200,
    longitude: 13.4050,
    city: 'Berlin',
    country: 'Deutschland',
    ip: '127.0.0.1',
    timezone: 'Europe/Berlin',
    isFallback: true
  });

  return (
    <div className="space-y-8">
      {/* Karte - Verwende die einfachere SimpleMap-Komponente */}
      <SimpleMap />
      
      {/* Standortinformationen - Verwende Fallback-Daten, wenn keine Daten verfügbar sind */}
      <LocationInfo 
        locationData={locationData || {
          latitude: 52.5200,
          longitude: 13.4050,
          city: 'Berlin',
          country: 'Deutschland',
          ip: '127.0.0.1',
          timezone: 'Europe/Berlin',
          isFallback: true
        }} 
      />
      
      {/* Über die Demo */}
      <AboutSection />
    </div>
  );
}
