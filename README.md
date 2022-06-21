# SRH Projekte, SQL-Interface

## Getting Started

Interface and aplication are discribed by [Teil-3/README.md](./docs/Teil-3/README.md) in the documents.

### Download and install

Install the [latest version of Deno][deno:install-latest], create the `.env` file:

```plain
DB_HOST=localhost

DB_USER=db-username
DB_PASS=db-password

DB_SDK_USER=db-sdk-username
DB_SDK_PASS=db-sdk-password
```

And run the following commands to set up the database:

```sh
deno run .\lib\run-create.ts
```

[deno:install-latest]: https://github.com/denoland/deno_install#install-latest-version
