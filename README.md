# BikeBuddy Frontend Dokumentation

Diese Dokumentation beschreibt das Frontend der BikeBuddy Web-App, die für die Bürger-Interessen-Gemeinschaft Lindenhof entwickelt wurde, um Probleme im Radwegenetz zu melden.

## Technologien

* Vue 3
* TailwindCSS
* Vue Router
* Pinia
* Leaflet

## Ziel der Dokumentation

Diese Dokumentation soll Entwicklern helfen, das Frontend der BikeBuddy-App zu verstehen, es einzurichten und weiterzuentwickeln.

## Voraussetzungen

Stelle sicher, dass du Node.js und npm (oder Yarn) installiert hast.

* Node.js: v16.0 oder höher (Empfohlen: Aktuelle LTS-Version)
* npm: v8.0 oder höher (wird mit Node.js installiert)

Optional:

* Vite:  Für die Entwicklungsumgebung empfohlen (wird im Projekt verwendet)

* ## Installation

1.  Klone das Repository (Ordner-Namen ggf. anpassen):

    ```bash
    git clone https://github.com/mrothpa/BikeBuddy.git
    cd frontend
    ```

2.  Installiere die Abhängigkeiten:

    ```bash
    npm install
    ```

3.  Konfiguration:

    * Passe die `./src/stores/appConfig.js` an, indem du die `backendUrl` und `defaultMapCenter` anpasst. Verwendest du das Gleiche Backend (oben erwähnt), kann du die erste auskommentierte Zeile in der Entwicklung verwenden (`127.0.0.1:8000`).
    * Ggf. sind weitere Text-Anpassung nötig. Siehe dazu insbesondere: `./src/components/`.
  
## Projektstruktur

src/
├── assets/             // Statische Dateien (CSS, Bilder)
│   ├── main.css        // Globale CSS-Datei (Tailwind) [cite: 64, 65]
│   ├── base.css        // Untergeordnete CSS-Datei (Tailwind) [cite: 64, 65]
│   ├── leaflet/        // Leaflet Marker Icons
│   └── fonts/          // Globale Schriftarten (Robotic von Google Fonts)
├── components/         // Vue-Komponenten (wiederverwendbare UI-Elemente)
│   ├── Navbar.vue
|   ├── BikeMap.vue
│   └── Und mehr
├── composables/
│   ├── useAddProblem.js
|   ├── useFetchProblems.js
│   └── Und mehr
├── views/              // Vue-Seiten (spezifische Ansichten) [cite: 65, 66]
│   ├── HomeView.vue    // Startseite
│   ├── LoginView.vue   // Login-Seite
│   └── SignupView.vue  // Registrierungsseite
├── router/             // Vue Router Konfiguration
│   └── index.js        // Routen-Definitionen [cite: 65, 66]
├── stores/             // Pinia Store Konfiguration
│   └── appConfig.js  
├── utils/              // API-Service (Custom Fetch-Befehl für "Paseto Token noch aktuell"-Abfrage) [cite: 66, 67]
│   └── auth.js
│   └── api.js          // Axios Instanz für API-Aufrufe [cite: 66, 67]
├── App.vue             // Hauptkomponente
└── main.js             // Einstiegspunkt der Anwendung

## Deployment

Um das Frontend zu deployen, erstelle einen Build:

```bash
npx run build
```

Der Build befindet sich dann im  `dist`-Ordner und kann auf einem Webserver bereitgestellt werden.

## Weiterentwicklung

Beiträge zum Projekt sind willkommen!

**Coding Standards:**

* Verwende die Vue 3 Composition API.
* Befolge die Konventionen von TailwindCSS.
* Kommentiere deinen Code klar und deutlich.
* Clone das Repository und markiere dieses hier.

**Abhängigkeiten aktualisieren:**

```bash
npm update
