import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "@/utils/get-messages";

export const metadata: Metadata = {
  title: "Leaflet Demo",
  description: "A map showing your location based on your IP address",
};

// Hilfsfunktion, um params.locale zu extrahieren
async function getLocale(params: { locale: string }) {
  // Durch das Awaiten von params wird sichergestellt, dass wir die Eigenschaft korrekt verwenden
  const resolvedParams = await Promise.resolve(params);
  return resolvedParams.locale;
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Verwenden der Hilfsfunktion, um locale zu extrahieren
  const locale = await getLocale(params);
  const messages = await getMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
