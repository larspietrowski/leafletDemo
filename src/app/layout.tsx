import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Leaflet Demo",
  description: "A map showing your location based on your IP address",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
            {children}
          </div>
        </ThemeProvider>
        {/* Script zur Behebung von Theme-Problemen */}
        <Script id="theme-switcher" strategy="afterInteractive">
          {`
            (function() {
              // Versuche, das gespeicherte Theme zu laden
              const savedTheme = localStorage.getItem('theme');
              if (savedTheme) {
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(savedTheme);
              } else {
                // Standard ist light
                document.documentElement.classList.add('light');
              }
              
              // Überwache Änderungen am Theme
              const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                  if (mutation.attributeName === 'class') {
                    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
                    localStorage.setItem('theme', currentTheme);
                    
                    // Stelle sicher, dass wir immer entweder 'light' oder 'dark' haben
                    if (!document.documentElement.classList.contains('light') && 
                        !document.documentElement.classList.contains('dark')) {
                      document.documentElement.classList.add('light');
                    }
                  }
                });
              });
              
              observer.observe(document.documentElement, { attributes: true });
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
