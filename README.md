# SRH Projekte, SQL-Interface

## Getting Started

Interface and aplication are discribed by [Teil-3/README.md](./docs/Teil-3/README.md) in the documents.

### Download, install and stream

Install the [latest version of Deno][deno:install-latest], and run the following command to set up the database:

```sh
deno run -A --unstable  ./lib/run-create.ts
```

Run the following command to start the HTTP webserver:

```sh
deno run -A --unstable  ./lib/run-stream.ts
```

[deno:install-latest]: https://github.com/denoland/deno_install#install-latest-version
