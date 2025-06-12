// Define the supported locales
const locales = ['de', 'en'] as const;
type Locale = typeof locales[number];

export async function getMessages(locale: string) {
  // Ensure the locale is supported, otherwise fallback to 'de'
  const safeLocale = locales.includes(locale as Locale) ? locale : 'de';
  
  // Import the messages for the requested locale
  const messages = (await import(`@/messages/${safeLocale}.json`)).default;
  
  return messages;
}
