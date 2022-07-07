import { bold, cyan, green, yellow } from 'https://deno.land/std@0.140.0/fmt/colors.ts';
import { Application, Router, RouterContext } from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import staticFiles from 'https://deno.land/x/static_files@1.1.6/mod.ts';

const app = new Application();

// ? logger
app.use(async ({ response, request }, next) => {
  await next();
  const rt = response.headers.get('X-Response-Time');

  console.log(`${green(request.method)} ${cyan(decodeURIComponent(request.url.pathname))} - ${bold(String(rt))}`);
});

// ? router
const router = new Router();
router
  .get('/api', ({ response }) => {
    response.status = 404;
    response.type = 'application/json';
    response.body = { message: '404: Not Found', code: 0 };
  })
  .get('/api/users/:uid/:role', ({ response, params }) => {
    if (params.uid == '@me') {
      // current user id
    }

    response.status = 404;
    response.type = 'application/json';
    response.body = { message: '404: Not Found', code: 0 };
  })
  .get('/api/:role/:resource', ({ response, params }) => {
    console.log({ params });

    response.status = 404;
    response.type = 'application/json';
    response.body = { message: '404: Not Found', code: 0 };
  })
  .get('/cdn/:role/:resource', ({ response, params }) => {
    console.log({ params });

    response.status = 404;
    response.type = 'application/json';
    response.body = { message: '404: Not Found', code: 0 };
  });

app.use(router.routes());
app.use(router.allowedMethods());

// ? files
app.use(staticFiles('./'));
app.use(async ({ request, response }, next) => {
  const fil = request.url.toString().split('/').pop();

  if (fil === undefined || fil.includes('.')) {
    next();
  } else if (!request.url.toString().endsWith('/')) {
    response.redirect(`${request.url.toString()}/`);
  } else {
    response.status = 404;
    response.type = 'text/html';
    response.body = await Deno.readTextFile(`${Deno.cwd()}/404.html`);
  }
});

// ?
app.addEventListener('listen', ({ hostname, port, secure }) => {
  console.log(`Listening on: ${secure ? 'https://' : 'http://'}${hostname ?? 'localhost'}:${port}`);
});

await app.listen('localhost:443');
