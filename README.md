# BikeBuddy Frontend Dokumentation

Diese Dokumentation beschreibt das Frontend der BikeBuddy Web-App, die für die Bürger-Interessen-Gemeinschaft Lindenhof entwickelt wurde, um Probleme im Radwegenetz zu melden.

## Inhaltsverzeichnis

1.  [Technologien](#technologien)
2.  [Ziel der Dokumentation](#ziel-der-dokumentation)
3.  [Voraussetzungen](#voraussetzungen)
4.  [Installation](#installation)
5.  [Projektstruktur](#projektstruktur)
6. [Deployment](#deployment)
7. [Weiterentwicklung](#weiterentwicklung)

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
│   ├── main.css        // Globale CSS-Datei (Tailwind)  
│   ├── base.css        // Untergeordnete CSS-Datei (Tailwind)  
│   ├── leaflet/        // Leaflet Marker Icons  
│   └── fonts/          // Globale Schriftarten (Robotic von Google Fonts)    
├── components/         // Vue-Komponenten (wiederverwendbare UI-Elemente)    
│   ├── Navbar.vue  
│   ├── BikeMap.vue  
│   └── Und mehr  
├── composables/         // Wiederverwendbare Logik  
│   ├── useAddProblem.js  
│   ├── useFetchProblems.js  
│   └── Und mehr  
├── views/              // Vue-Seiten (spezifische Ansichten)  
│   ├── HomeView.vue    // Startseite  
│   ├── LoginView.vue   // Login-Seite  
│   ├── SignupView.vue  // Registrierungsseite  
├── router/             // Vue Router Konfiguration  
│   └── index.js        // Routen-Definitionen  
├── stores/             // Pinia Store Konfiguration  
│   └── appConfig.js  
├── utils/              // Hilfsfunktionen (z.B. API-Service)  
│   ├── auth.js  
│   └── api.js          // Axios Instanz für API-Aufrufe  
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
* Beachte die Affero General Public License Version 3 (AGPLv3)

**Abhängigkeiten aktualisieren:**

```bash
npm update
