import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import MapWrapper from '@/components/MapWrapper';
import ThemeToggle from '@/components/ThemeToggle';

// Hilfsfunktion, um params.locale zu extrahieren
async function getLocale(params: { locale: string }) {
  // Durch das Awaiten von params wird sichergestellt, dass wir die Eigenschaft korrekt verwenden
  const resolvedParams = await Promise.resolve(params);
  return resolvedParams.locale;
}

export default async function Home({
  params
}: {
  params: { locale: string }
}) {
  // Verwenden der Hilfsfunktion, um locale zu extrahieren
  const locale = await getLocale(params);
  // Pass the locale to getTranslations
  const t = await getTranslations({ locale });
  const otherLocale = locale === 'de' ? 'en' : 'de';
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="w-full max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link 
              href={`/${otherLocale}`} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {t('switchLanguage')}
            </Link>
          </div>
        </div>
        
        <p className="mb-8 text-lg text-gray-900 dark:text-white">{t('description')}</p>
        
        <div className="w-full">
          <MapWrapper />
        </div>
      </div>
    </main>
  );
}
