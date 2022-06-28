[← Dauerprojekt Datenbanken](../README.md#dauerprojekt-datenbanken)

# Aufgabenstellungen zu Teil II: Erstellen und testen der Datenbankstruktur

Erstellen Sie für die folgenden Frage- und Aufgabenstellungen, die auf Basis Ihrer Datenbankstruktur erstellt wurden, jeweils eine passende SQL-Anweisung:

<br>

#### 1. Selektieren Sie alle Gruppen (ID und Name), die in Ihrer Datenbank eingetragen sind, nach Gruppenname aufsteigend sortiert.

```sql
SELECT `id`, `name` FROM `srh_sql_interface`.`d_groups`
  ORDER BY `name` ASC;
```

```md
> Showing rows 0 - 1 (2 total, Query took 0.0022 seconds.) [name: GRUPPE 01... - GRUPPE 02...]

| id                 | name      |
| ------------------ | --------- |
| 298726187284621235 | Gruppe 01 |
| 298726222848651285 | Gruppe 02 |
```

<br>

#### 2. Selektieren Sie alle hochgeladenen Bilder (Avatare und Banner) und sortieren Sie nach der Größe der Dateien (absteigend). Begrenzen Sie die Ausgabe auf die ersten 10 Treffer.

```sql
-- ? Sortiert nach Dateigröße
SELECT * FROM `srh_sql_interface`.`d_figure`
  ORDER BY LENGTH(`data`) DESC
  LIMIT 10;

-- ? Sortiert nach der Auflösung der Bilder
SELECT * FROM `srh_sql_interface`.`d_figure`
  ORDER BY `size` DESC
  LIMIT 10;
```

```md
> Showing rows 0 - 9 (10 total, Query took 0.0022 seconds.) [size: 512... - 256...]

| hash                             | size | data          |
| -------------------------------- | ---- | ------------- |
| 1a9ffd58f73deb082c59b6062a607b7e | 512  | [BLOB - 35 B] |
| 31e5e4f2ed037db75390982312c3af9f | 512  | [BLOB - 35 B] |
| 46e6b522cbf351c41de1ed1fae9ba3a2 | 512  | [BLOB - 35 B] |
| 64d890648f7b31e8841c4441e5d8625c | 512  | [BLOB - 35 B] |
| 70cb8c5e6af3fa1b933fe1c3ff7d41a3 | 512  | [BLOB - 35 B] |
| 1a9ffd58f73deb082c59b6062a607b7e | 256  | [BLOB - 27 B] |
| 31e5e4f2ed037db75390982312c3af9f | 256  | [BLOB - 27 B] |
| 46e6b522cbf351c41de1ed1fae9ba3a2 | 256  | [BLOB - 27 B] |
| 64d890648f7b31e8841c4441e5d8625c | 256  | [BLOB - 27 B] |
| 70cb8c5e6af3fa1b933fe1c3ff7d41a3 | 256  | [BLOB - 27 B] |
```

<br>

#### 3. Fügen Sie Ihren Nutzern einen neuen Eintrag hinzu („Dummy“, Beitritt am 01.06.2022).

```sql
INSERT INTO `srh_sql_interface`.`d_member`
  (`id`,                 `joined_at`,  `username`, `caption`, `system`) values
  ('298726187285496486', '2022-06-01', 'Dummy',    NULL,      '0' );
```

```md
> 1 row inserted. (Query took 0.0137 seconds.)
```

<br>

#### 4. Selektieren Sie alle Nutzer, die der ersten Gruppe in Ihrer Datenbank zugeordnet sind.

```sql
SELECT `mem`.* FROM (
    -- ? Unterabfrage für Gruppe mit dem kleinsten Index
    SELECT `gro`.`id` FROM `srh_sql_interface`.`d_groups` AS `gro`
      ORDER BY  `gro`.`id`
      LIMIT 1
  ) as `first_gro`

  -- ? Finde alle Nutzer die dieser Gruppe zugeordnet sind
  LEFT JOIN `srh_sql_interface`.`l_groups_member` AS `gro_mem`
    ON `gro_mem`.`groups` = `first_gro`.`id`
  LEFT JOIN `srh_sql_interface`.`d_member` AS `mem`
    ON `gro_mem`.`member` = `mem`.`id`
```

```md
> Showing rows 0 - 1 (2 total, Query took 0.0024 seconds.)

| id                 | username | caption                                               | joined_at  | system |
| ------------------ | -------- | ----------------------------------------------------- | ---------- | ------ |
| 298726222848851970 | Glados   | Cake and grief counseling will be available at the... | 2022-01-01 | 1      |
| 298726187285348353 | Alice    | NULL                                                  | 2022-06-21 | 0      |
```

<br>

#### 5. Wie lauten die Namen der Nutzer, die sich in den letzten drei Monaten angemeldet haben?

```sql
SELECT `mem`.`username` FROM `srh_sql_interface`.`d_member` as `mem`
  WHERE `mem`.`joined_at` >= ( CURDATE() - INTERVAL 90 DAY )
```

```md
> Showing rows 0 - 2 (3 total, Query took 0.0027 seconds.)

| username |
| -------- |
| Nelly    |
| Alice    |
| Dummy    |
```

<br>

#### 6. Ändern Sie den Datensatz, der in 3. angelegt wurde: Das Beitrittsdatum war der „01.05.2022“.

```sql
UPDATE `srh_sql_interface`.`d_member` as `mem`
  SET `mem`.`joined_at` = '2022-05-01'
  WHERE `mem`.`id` = '298726187285496486';
```

```md
> 1 row affected. (Query took 0.0066 seconds.)
```

<br>

#### 7. Selektieren Sie alle Hashwerte der zugewiesenen Gruppenavatare.

```sql
SELECT `ava`.`figure` as 'hash' FROM `srh_sql_interface`.`l_groups_avatar` as `ava`
  GROUP BY `ava`.`figure`;
```

```md
> Showing rows 0 - 0 (1 total, Query took 0.0036 seconds.)

| hash                             |
| -------------------------------- |
| 64d890648f7b31e8841c4441e5d8625c |
```

<br>

#### 8. Welches Bild (Avatar oder Banner) wird am häufigsten in Ihrer Datenbank verwendet?

```sql
SELECT `fig`.* FROM (
    -- ? Unterabfrage für den am häufigsten referenzierten Hash
    SELECT * FROM (
        SELECT `figure` FROM `srh_sql_interface`.`l_groups_avatar` UNION ALL
        SELECT `figure` FROM `srh_sql_interface`.`l_member_avatar` UNION ALL
        SELECT `figure` FROM `srh_sql_interface`.`l_member_banner` ) AS `all`
      GROUP BY `all`.`figure`
      ORDER BY COUNT(*) DESC
      LIMIT 1
  ) AS `ref`

  -- ? Finde das Bild (in allen Auflösungen)
  LEFT JOIN `srh_sql_interface`.`d_figure` AS `fig`
    ON `ref`.`figure` = `fig`.`hash`
```

```md
> Showing rows 0 - 2 (3 total, Query took 0.0054 seconds.)

| hash                             | size | data          |
| -------------------------------- | ---- | ------------- |
| 64d890648f7b31e8841c4441e5d8625c | 128  | [BLOB - 11 B] |
| 64d890648f7b31e8841c4441e5d8625c | 256  | [BLOB - 27 B] |
| 64d890648f7b31e8841c4441e5d8625c | 512  | [BLOB - 35 B] |
```

<br>

#### 9. Löschen Sie den in 3. angelegten Datensatz wieder aus Ihrer Datenbank.

```sql
DELETE FROM `srh_sql_interface`.`d_member`
  WHERE `id` = '298726187285496486';

-- ? I'm not sure why I can't use 'AS' here :(
-- DELETE FROM `srh_sql_interface`.`d_member` AS `mem`
--   WHERE `mem`.`id` = '298726187285496486';
```

```md
> 1 row affected. (Query took 0.0125 seconds.)
```

<br>

#### 10. Erstellen Sie eine Abfrage, die alle Nutzer selektiert, die keiner Gruppe zugeordnet sind.

```sql
SELECT `mem`.* FROM `srh_sql_interface`.`d_member` as `mem`
  LEFT JOIN `srh_sql_interface`.`l_groups_member` as `gro_mem`
    ON `gro_mem`.`member` = `mem`.`id`
  WHERE `gro_mem`.`member` IS NULL;
```

```md
> Showing rows 0 - 0 (1 total, Query took 0.0033 seconds.)

| id                 | username | caption | joined_at  | system |
| ------------------ | -------- | ------- | ---------- | ------ |
| 298726151784759296 | Nelly    | NULL    | 2022-06-21 | 0      |
```
