# DemoNextJSLeaflet

## Projektbeschreibung

Dieses Projekt demonstriert die Integration von [Leaflet](https://leafletjs.com/) in eine [Next.js](https://nextjs.org/) Anwendung. Es zeigt, wie interaktive Karten mit React-Komponenten und TailwindCSS gestaltet werden können. Zusätzlich unterstützt das Projekt einen Light/Dark Mode, der sich auf die Karte und die UI-Elemente auswirkt.

## Features

- Interaktive Leaflet-Karte mit Marker und Popups
- Light/Dark Mode mit dynamischer Anpassung der Karten- und UI-Farben
- Responsive Design mit TailwindCSS
- Einfache Erweiterbarkeit für eigene Kartenlayer oder Features

## Setup & Installation

1. **Repository klonen**
   ```bash
   git clone https://github.com/....
   ```

2. **Abhängigkeiten installieren**
   ```bash
   npm install
   ```

3. **Entwicklungsserver starten**
   ```bash
   npm run dev
   ```
   Die App ist dann unter [http://localhost:3000](http://localhost:3000) erreichbar.

## Nutzung

- Die Startseite zeigt eine Leaflet-Karte.
- Über einen Button oder das UI kann zwischen Light und Dark Mode gewechselt werden.
- Die Karte und UI-Elemente passen sich automatisch dem gewählten Modus an.

## Anpassung

- **Kartenposition und Zoom:**  
  Passe die Standardposition und den Zoom im Karten-Komponentenfile an (`src/components/Map.tsx` oder ähnlich).
- **Eigene Marker/Layer:**  
  Ergänze weitere Marker, Popups oder Layer nach Bedarf in der Karten-Komponente.
- **Styles:**  
  Passe globale Styles in `src/app/globals.css` an. Die Datei enthält spezifische Regeln für Light/Dark Mode und Leaflet.

## Light/Dark Mode Hinweise

- Die Umschaltung erfolgt über CSS-Klassen (`html.light` / `html.dark`).
- Die Karte und UI-Elemente werden per CSS angepasst, siehe `globals.css`.
- Leaflet-Controls und Hintergrundfarben sind für beide Modi optimiert.

## Verwendete Technologien

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Leaflet](https://leafletjs.com/)
- [React-Leaflet](https://react-leaflet.js.org/)
- [TailwindCSS](https://tailwindcss.com/)

## Weiterführende Links

- [Leaflet Dokumentation](https://leafletjs.com/reference.html)
- [Next.js Dokumentation](https://nextjs.org/docs)
- [TailwindCSS Dokumentation](https://tailwindcss.com/docs)

## Lizenz

MIT License

---

*Bei Fragen oder Anregungen bitte ein Issue eröffnen.*
