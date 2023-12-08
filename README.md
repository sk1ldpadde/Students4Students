# programmentwurf-gruppe-2

programmentwurf-gruppe-2 created by GitHub Classroom

# Allgemeine Informationen zum Projekt

Social Network mit dem Namen Students4Students. Es handelt sich um ein exklusives Social Network für Studenten an der DHBW Stuttgart. Mit Students4Students können die Studenten sich untereinander vernetzen und alle Probleme rund um des Studierendenlebends lösen.

Die Hauptfunktionalität der Plattform besteht darin, Anzeigen (wie beispielsweise bei Ebay Kleinanzeigen) zu erstellen, in denen Studierende sich gegenseitig etwas Anbieten oder nach etwas Fragen können.  
Ein Beispiel dafür wäre: Man braucht hilfe für einen Umzug in eine neue Wohnung. --> Hierbei hilft `Students4Students`

Zu den Funktionen der App gehören auch:

- Exklusiver Zugang als DHBW-Stuttgart-Student mit der Dhbw-email.
- Anzeigen, Erstellen und Löschen von eigen erstellten Anzeigen.
- Ein Like-System für Anzeigen, um Posts von Kommilitonen zu unterstützen
- Eine Kommentarfunktion, bei der Kommentare / Anfrage versuche direkt auf die Email des Post-Operators geschickt werden.

Für die Dokumentation, siehe: Orga/arc42_dokumentation_students4students.pdf

# Getting started:

## Wie läuft die Einrichtung des Repositories ab?

Bewegen Sie sich in der Konsole zu dem Ordner, in dem sie das Projekt klonen wollen (cd "Ordnername).  
Führen Sie den Befehl:  
`git clone https://github.com/dhbw-stuttgart-webengineering/programmentwurf-gruppe-2.git`
aus und melden Sie sich gegebenenfalls bei einer Aufforderung mit ihrem Github-Konto an.

Das Repository wurde nun eingerichtet und Sie können dieses mit der SETUP.bat / SETUP.sh Datei ausführen! (siehe nächstes Kapitel)

## Welche externen Bibliotheken werden benötigt & Wie bringt man das Projekt zum laufen?

In diesem Projekt wurden viele Bibliotheken und Frameworks benutzt. Deswegen wurde das Projekt in Docker virtualisisert und Sie können die Seite mit nur zwei Klicks auf ihrem Localhost hosten.

Wichtig: da die Appliaktion wird über Docker-Container aufgebaut wird, ist die einzige
Voraussetzung, dass Sie Docker Desktop auf Ihrem Rechner installiert haben!

Zur Ausführung des Projektes lassen Sie

- auf Windows: das SETUP.bat
- auf einem MacOS oder Linux-Rechner: SETUP.sh
  laufen.

Folgen Sie den Aufforderungen in dem Konsolenfenster. Bei der Setup-Datei wird zuerst die Datenbank als Docker Container erstellt. Danach werden Sie aufgefordert eine beliebige Taste zu betätigen. Nach dem Betätigen der Taste wird zuerst das Backend und dann das Frontend erstellt. Dies kann, je nach Rechner 1 bis 3 Minuten dauern.

Zusätzlich, bitte beachten Sie, dass sie ihren AdBlock deaktiviert haben, da sonst einige der Funktionen blockiert werden.

## Wie führt man Tests aus?

Zur Ausführung von Frontend Tests führen Sie die TEST_FRONTEND.bat Datei aus, während die Docker-Container laufen.  
Zur Ausführung von Backend Tests führen Sie die TEST_BACKEND.bat Datei aus, während die Docker-Container laufen.  
(Dies ist momentan nur auf Windows Rechnern als vorgefertigtes Skript verfügbar)

# Gewöhnliche Fehler:

- handshake Error beim build der Docker-Container:  
  Beschreibung:  
  Beim Ausführen der SETUP.bat gibt es einen Handshake-Error zwischen dem Backend und der Datenbank.
  Das hat die Folge, dass der Backup Container nicht erfolgreich gestartet werden kann.  
  Lösung:  
  Bitte Überprüfen Sie, ob ihr Datenbank-Container bei dem zweiten Schritt der SETUP.Bat wirklich aktiv läuft.
  Wenn nicht starten Sie diese über ihre Docker Desktop Applikation.

- Deletion von Posts funktioniert nicht:  
  Beschreibung:  
  Bei Profil unter "eigene Posts" funktioniert der Delete-Button nicht  
  Lösung:  
  Bitte schalten Sie ihren Ad-Blocker aus, da dieser hier die HTTP-Request blockiert.

- Die Registrierung mit dem Link funktioniert nicht  
  Beschreibung & Lösung:  
  Bei der Registrierung wird ein Link an die angegebene infdhbw email geschickt. Bitte Beachten Sie bei der ausführung des Links, dass sie _auf demselben Gerät_ den Link öffnen, also dort, wo auch die Docker-Container laufen!

# Liste der Abhängigkeiten:

- Languages:
  `TypeScript`
  `Python`
- Frameworks:
  `React.js`
  `Django`
  `Bootstrap`
  `Tailwind`

- Libraries:
  | Python | React.js |
  |-----------------------|-------------------|
  | Regex | Axios |
  | Django | Bootstrap |
  | Gunicorn | Crypto-js |
  | django-cors-headers | React |
  | django-rest-framework | React-dom |
  | mysqlclient | React-router-dom |
  | asgiref | msw |
  | Pytz | |
  | typing-extensions | |
  | sqlparse | |
