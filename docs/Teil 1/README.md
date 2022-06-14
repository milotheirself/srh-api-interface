[← Dauerprojekt Datenbanken](../README.md#dauerprojekt-datenbanken)

# Teil 1: Databasedesign

## Content examples and project objective

The database is intended to be a simple profile manager in the form of a local web server and API, in which users can edit profile elements via a simple interface. Since it is only about writing and reading data, this does not involve any form of security. Anyone can read and write any data.

### API – read database contents

```js
GET /api/people/{user.id}
```

Response with JSON –

```json
{
  "id": "80351110224678912",
  "username": "Nelly",
  "avatar": "8342729096ea3675442027381ff50dfe",
  "banner": "06c16474723fe537c283b8efa61a30c8",
  "system": false
}
```

Response with JSON message; when request is invalid –

```json
{ "message": "404: Not Found", "code": 0 }
```

### API – write database contents

```js
PATCH /api/people/{user.id}
```

Response with JSON message; when request is invalid or accepted –

```json
{ "message": "Done", "code": 1 }
```

```json
{ "message": "Invalid request", "code": 0 }
```

### CDN – read images

```js
GET /cdn/avatar/{file.hash}
GET /cdn/banner/{file.hash}
```

Response with data stream –  
Response with 404 document; when request is invalid –

<br>

---

<br>

## Entity Relationship Diagram (ERM)

[...]

## Relationenschreibweise

[...]
