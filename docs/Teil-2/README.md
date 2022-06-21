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
INSERT INTO `srh_sql_interface`.`d_member`
  (`id`,                  `joined_at`,  `username`, `caption`, `system`) values
  ('298726187285496486',  '2022-06-01', 'Dummy',    NULL,      false );
```

4. Selektieren Sie alle Nutzer, die der ersten Gruppe in Ihrer Datenbank zugeordnet sind.

```sql
SELECT `mem`.* FROM (
    -- ? Unterabfrage für Gruppe mit dem kleinsten Index
    SELECT * FROM `srh_sql_interface`.`d_groups` AS `gro`
      ORDER BY  `gro`.`id`
      LIMIT 1
  ) as `first_gro`

  -- ? Finde alle Nutzer die dieser Gruppe zugeordnet sind
  LEFT JOIN `srh_sql_interface`.`l_groups_member` AS `gro_mem`
    ON `gro_mem`.`groups` = `first_gro`.`id`
  LEFT JOIN `srh_sql_interface`.`d_member` AS `mem`
    ON `gro_mem`.`member` = `mem`.`id`
```

5. Wie lauten die Namen der Nutzer, die sich in den letzten drei Monaten angemeldet haben?

```sql
SELECT `username` FROM `srh_sql_interface`.`d_member`
  WHERE `joined_at` >= ( CURDATE() - INTERVAL 90 DAY )
```

6. Ändern Sie den Datensatz, der in 3. angelegt wurde: Das Beitrittsdatum war der „01.05.2022“.

```sql
UPDATE `srh_sql_interface`.`d_member`
  SET `joined_at` = '2022-05-01'
  WHERE `id` = '298726187285496486';
```

7. Selektieren Sie alle Hashwerte der zugewiesenen Gruppenavatare.

```sql
SELECT `figure` FROM `srh_sql_interface`.`l_groups_avatar`
  GROUP BY `figure`;
```

8. Welches Bild (Avatar oder Banner) wird am häufigsten in Ihrer Datenbank verwendet?

```sql
SELECT `fig`.* FROM (
    -- ? Unterabfrage für den am häufigsten referenzierten Hash
    SELECT * FROM (
        SELECT `figure` FROM `srh_sql_interface`.`l_groups_avatar` UNION ALL
        SELECT `figure` FROM `srh_sql_interface`.`l_member_avatar` UNION ALL
        SELECT `figure` FROM `srh_sql_interface`.`l_member_banner` ) AS `all`
      GROUP BY `all`.`figure`
      ORDER BY  COUNT(*) DESC
      LIMIT 1
  ) AS `ref`

  -- ? Finde das Bild (in allen Auflösungen)
  LEFT JOIN `srh_sql_interface`.`d_figure` AS `fig`
    ON `ref`.`figure` = `fig`.`hash`
```

9. Löschen Sie den in 3. angelegten Datensatz wieder aus Ihrer Datenbank.

```sql
DELETE FROM `srh_sql_interface`.`d_member`
  WHERE `id` = '298726187285496486';
```

10. Erstellen Sie eine Abfrage, die alle Nutzer selektiert, die keiner Gruppe zugeordnet sind.

```sql
SELECT * FROM `srh_sql_interface`.`d_member`
  LEFT JOIN `srh_sql_interface`.`l_groups_member` ON `member` = `id`
  WHERE `member` IS NULL;
```
