'use client';

import { useTranslations } from 'next-intl';
import { FiInfo, FiCode, FiFeather } from 'react-icons/fi';

export default function AboutSection() {
  const t = useTranslations();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center text-gray-900 dark:text-white">
        <FiInfo className="mr-2 text-blue-500" /> {t('aboutDemo')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Technologien */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-900 dark:text-white">
            <FiCode className="mr-2 text-purple-500" /> {t('technologies')}
          </h3>
          <ul className="space-y-2 text-gray-900 dark:text-white">
            <li className="text-gray-900 dark:text-white">• Next.js 15 mit App Router</li>
            <li className="text-gray-900 dark:text-white">• React 19</li>
            <li className="text-gray-900 dark:text-white">• TypeScript</li>
            <li className="text-gray-900 dark:text-white">• Leaflet & React-Leaflet</li>
            <li className="text-gray-900 dark:text-white">• Tailwind CSS</li>
            <li className="text-gray-900 dark:text-white">• next-intl (Internationalisierung)</li>
            <li className="text-gray-900 dark:text-white">• next-themes (Dark/Light Mode)</li>
          </ul>
        </div>
        
        {/* Features */}
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-900 dark:text-white">
            <FiFeather className="mr-2 text-green-500" /> {t('features')}
          </h3>
          <ul className="space-y-2 text-gray-900 dark:text-white">
            <li className="text-gray-900 dark:text-white">• {t('ipBasedGeolocation')}</li>
            <li className="text-gray-900 dark:text-white">• {t('interactiveMap')}</li>
            <li className="text-gray-900 dark:text-white">• {t('bilingual')}</li>
            <li className="text-gray-900 dark:text-white">• {t('responsiveDesign')}</li>
            <li className="text-gray-900 dark:text-white">• {t('fallbackPosition_short')}</li>
            <li className="text-gray-900 dark:text-white">• {t('modernUI')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
