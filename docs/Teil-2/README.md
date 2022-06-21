[← Dauerprojekt Datenbanken](../README.md#dauerprojekt-datenbanken)

# Aufgabenstellungen zu Teil II: Erstellen und testen der Datenbankstruktur

Erstellen Sie für die folgenden Frage- und Aufgabenstellungen, die auf Basis Ihrer Datenbankstruktur erstellt wurden, jeweils eine passende SQL-Anweisung:

1. Selektieren Sie alle Gruppen (ID und Name), die in Ihrer Datenbank eingetragen sind, nach Gruppenname aufsteigend sortiert.

```sql
SELECT `id`, `name` FROM `srh_sql_interface`.`d_groups`
  ORDER BY `name` ASC;
```

2. Selektieren Sie alle hochgeladenen Bilder (Avatare und Banner) und sortieren Sie nach der Größe der Dateien (absteigend). Begrenzen Sie die Ausgabe auf die ersten 10 Treffer.

```sql
SELECT * FROM `srh_sql_interface`.`d_figure`
  ORDER BY `size` DESC
  LIMIT 10;
```

3. Fügen Sie Ihren Nutzern einen neuen Eintrag hinzu („Dummy“, Beitritt am 01.06.2022).

```sql

```

4. Selektieren Sie alle Nutzer, die der ersten Gruppe in Ihrer Datenbank zugeordnet sind.

```sql

```

5. Wie lauten die Namen der Nutzer, die sich in den letzten drei Monaten angemeldet haben?

```sql
SELECT `username` FROM `srh_sql_interface`.`d_member`
  WHERE `joined_at` >= ( CURDATE() - INTERVAL 90 DAY )
```

6. Ändern Sie den Datensatz, der in 3. angelegt wurde: Das Beitrittsdatum war der „01.05.2022“.

```sql

```

7. Selektieren Sie alle Hashwerte der zugewiesenen Gruppenavatare.

```sql

```

8. Welches Bild (Avatar oder Banner) wird am häufigsten in Ihrer Datenbank verwendet?

```sql

```

9. Löschen Sie den in 3. angelegten Datensatz wieder aus Ihrer Datenbank.

```sql

```

10. Erstellen Sie eine Abfrage, die alle Nutzer selektiert, die keiner Gruppe zugeordnet sind.

```sql

```
