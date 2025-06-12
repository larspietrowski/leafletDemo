'use client';

import { useTranslations } from 'next-intl';
import { FiMapPin, FiGlobe, FiAlertTriangle } from 'react-icons/fi';

interface LocationData {
  city: string;
  country: string;
  ip: string;
  timezone: string;
  isFallback: boolean;
  latitude: number;
  longitude: number;
}

export default function LocationInfo({ locationData }: { locationData: LocationData }) {
  const t = useTranslations();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900 dark:text-white">
        <FiMapPin className="mr-2 text-red-500" /> {t('yourLocation')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Standort-Informationen */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-900 dark:text-white">
            <FiMapPin className="mr-2 text-blue-500" /> {t('location')}
          </h3>
          <p className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{locationData.city}, {locationData.country}</p>
          <p className="text-gray-600 dark:text-gray-300">{locationData.city}</p>
          
          {locationData.isFallback && (
            <div className="mt-2 text-amber-600 dark:text-amber-400 flex items-center">
              <FiAlertTriangle className="mr-1" /> {t('fallbackPosition')}
            </div>
          )}
        </div>
        
        {/* Details */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-900 dark:text-white">
            <FiGlobe className="mr-2 text-green-500" /> {t('details')}
          </h3>
          <div className="space-y-2">
            <p className="text-gray-900 dark:text-white">
              <span className="font-semibold">{t('ip')}:</span> {locationData.ip}
            </p>
            <p className="text-gray-900 dark:text-white">
              <span className="font-semibold">{t('timezone')}:</span> {locationData.timezone}
            </p>
            {locationData.isFallback && (
              <p className="text-amber-600 dark:text-amber-400 flex items-center">
                <FiAlertTriangle className="mr-1" /> {t('fallbackPosition')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
