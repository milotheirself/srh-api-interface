# API – read database contents

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

<br>
<br>

# CDN – read an write files

```js
GET /cdn/avatar/{file.hash}
GET /cdn/banner/{file.hash}
```

Response with data stream –  
Response with 404 document; when request is invalid –
