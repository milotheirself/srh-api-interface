# Dauerprojekt Datenbanken

## Teil 1: Datenbankdesign

Der erste Teil des Projektes behandelt das Datenbankdesign, in dem Sie beginnend von der Grundidee bis hin zu einem fertig modellierten Entity-Relationship-Diagram (ERD) und den Entitäten in Relationenschreibweise Ihre Datenbank beschreiben.

### Aufgaben

1. Erstellen Sie eine Sammlung von Inhalten, die Sie in Ihrer Datenbank abbilden wollen. (z.B. in Form einer Mindmap)

2. Übertragen Sie Ihre Datensammlung in ein ERD und erstellen Sie die Beziehungen zwischen den Entitäten

3. Wenden Sie im Zuge der Modellierung die Regeln der Normalisierung an und erweitern, oder ändern Sie Ihr ERD entsprechend

4. Notieren Sie Ihre Entitäten in der Relationenschreibweise und markieren die Primärund Fremdschlüssel eindeuti

### Document

- [x] [Sammlung von Inhalten / Grundkonzeption](./Teil-1/README.md#content-examples-and-project-objective)
- [x] [Entity Relationship Diagram (ERM)](./Teil-1/README.md#entity-relationship-diagram-erm)
- [x] [Relationenschreibweise](./Teil-1/README.md#relationenschreibweise)

<br>

## Teil 2: Erstellen und testen der Datenbankstruktur

Der zweite Teil des Projektes dient dazu, Ihre Datenbank in ein Datenbank-Management-System (DBMS) umzusetzen und diese im Anschluss mit Testdaten zu befüllen. Zur Überprüfung der korrekten Umsetzung der Modelle und Verknüpfung der abhängigen Daten werden basierend auf Ihren Testdaten, Abfragen erstellt. Weiterhin werden Sie im Zuge des zweiten Teiles Sicherungen Ihrer Datenbank anlegen und mit den Import- und Export-Funktionen des DMBS arbeiten.

### Aufgaben

1. Erstellen Sie auf Basis Ihres Datenbankmodells eine (leere) Datenbank mit allen
   Tabellen aus Ihrem Modell

2. Setzen Sie die Beziehungen aus dem Datenbankmodell um und wählen Sie
   passende Einschränkungen für das Bearbeiten oder Löschen von abhängigen
   Daten

3. Füllen Sie Ihre fertig erstellen Tabellen mit einigen (wenigen) Testdaten und
   testen Sie mit einfachen Abfragen Ihre Datenbankstruktur

4. Nach erfolgreichem Test können Sie auch umfangreichere Datensätze in Ihre
   Datenbank importieren, oder eingeben

5. Bearbeiten Sie die Aufgabenstellungen, die Sie auf Basis Ihrer Datenbank
   erhalten haben

### Document

- [x] [Datenbank nach ERM, mit Beispieldaten](./Teil-2/README.md)
- [ ] Bearbeitung der Aufgabenstellungen

<br>

## Teil 3: Einbinden der Datenbank in eine Anwendung

Dieser dritte Teil kann auf verschiedene Arten gelöst werden, wobei der SQL-Anteil oft sehr
ähnlich gelöst wird, sei es zur Anwendung auf einer Webseite, oder in einem JAVA-/ C#-/
Python-Programm. Im Anhang sind zwei Beispiele zur Integration in eine „endbenutzerfähige“
Anwendung beigefügt.

### Aufgaben

1. Erstellen Sie einen Funktionsaufruf zum Aufbau der Datenbankverbindung.

2. Testen Sie die Datenbankverbindung, indem Sie eine Abfrage zur Datenbank senden
   und das Ergebnis in Ihrer Anwendung ausgeben lassen.

3. Erstellen Sie ein Formular zur Eingabe von Datensätzen in Ihre Datenbank. Lassen
   Sie die notwendigen „INSERT“-Anweisungen anhand der vom Benutzer
   eingegebenen Werte generieren.

4. Erstellen Sie eine Ansicht, über die Sie Inhalte der Datenbank anzeigen lassen
   können. Implementieren Sie auch eine Selektion nach einem Suchbegriff, oder nach
   Kategorien.

### Document

- [ ] Implementierung
