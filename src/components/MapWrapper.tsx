'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import LocationInfo from './LocationInfo';
import AboutSection from './AboutSection';
import { LocationData } from './Map';
import 'leaflet/dist/leaflet.css';

// Dynamisch importieren, um SSR-Probleme zu vermeiden
const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-[500px] bg-gray-100 dark:bg-gray-700 rounded-lg">Lade Karte...</div>
});

export default function MapWrapper() {
  // State für die echten Standortdaten
  const [locationData, setLocationData] = useState<LocationData | null>(null);

  const handleLocationUpdate = (location: LocationData) => {
    setLocationData(location);
  };

  return (
    <div className="space-y-8">
      {/* Karte - Verwende die Map-Komponente mit IP-Geolocation */}
      <Map onLocationUpdate={handleLocationUpdate} />
      
      {/* Standortinformationen - Zeige echte oder Fallback-Daten */}
      {locationData && <LocationInfo locationData={locationData} />}
      
      {/* Über die Demo */}
      <AboutSection />
    </div>
  );
}
