'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageSelector() {
  const t = useTranslations();
  const pathname = usePathname();
  
  const currentLocale = pathname.split('/')[1];
  const otherLocale = currentLocale === 'de' ? 'en' : 'de';
  
  return (
    <Link 
      href={`/${otherLocale}`} 
      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors flex items-center space-x-2"
    >
      <span className="mr-2">
        {otherLocale === 'de' ? '🇩🇪' : '🇬🇧'}
      </span>
      {t('switchLanguage')}
    </Link>
  );
}
