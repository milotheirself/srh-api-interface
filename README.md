# SRH-Projekt; SQL Datenbank

## Getting Started

Interface and application are described by [Teil-1 (README.md)](./docs/Teil-1/README.md) and [Teil-3 (README.md)](./docs/Teil-3/README.md).

### How to run

Install [XAMPP][xampp:install-latest] and the [latest version of Deno][deno:install-latest], and run the following command to set up the database:

```sh
deno run -A --unstable  ./lib/run-create.ts
```

Than run the following command to start the webserver:

```sh
deno run -A --unstable  ./lib/run-stream.ts
```

[xampp:install-latest]: https://www.apachefriends.org/download
[deno:install-latest]: https://github.com/denoland/deno_install#install-latest-version
