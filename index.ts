import { Application } from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import staticFiles from 'https://deno.land/x/static_files@1.1.6/mod.ts';

const app = new Application();

app.use(staticFiles('./'));
app.use(async ({ request, response }, next) => {
  const fil = request.url.toString().split('/').pop();

  if (fil === undefined || fil.includes('.')) {
    next();
  } else if (!request.url.toString().endsWith('/')) {
    response.redirect(`${request.url.toString()}/`);
  } else {
    response.status = 404;
    response.body = await Deno.readTextFile(`${Deno.cwd()}/404.html`);
  }
});

await app.listen();
