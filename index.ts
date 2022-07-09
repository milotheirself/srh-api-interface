import { Application, Router, isHttpError, Status, Context } from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import staticFiles from 'https://deno.land/x/static_files@1.1.6/mod.ts';
import { resolve } from 'https://deno.land/std@0.146.0/path/mod.ts';

async function notFound(context: Context) {
  context.response.status = 404;
  context.response.type = 'text/html';
  context.response.body = await Deno.readTextFile(resolve(Deno.cwd(), './404.html'));
}

function notFoundAPI(context: Context) {
  context.response.status = Status.NotFound;
  context.response.type = 'application/json';
  context.response.body = JSON.stringify({ message: '404: Not Found', code: 0 });
}

const app = new Application();

// ? error handler
app.use(async (context, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      context.response.status = err.status;
      const { message, status, stack } = err;

      if (context.request.accepts('json')) {
        context.response.body = { message, status, stack };
        context.response.type = 'json';
      } else {
        context.response.body = `${status} ${message}\n\n${stack ?? ''}`;
        context.response.type = 'text/plain';
      }
    } else {
      console.log(err);
      throw err;
    }
  }
});

// ? api
const routerAPI = new Router();
routerAPI //
  .get('/api/users/:uid/:role', (context) => {
    if (context.params.uid == '@me') {
      // current user id
    }

    notFoundAPI(context);
  })
  .get('/api/:role/:resource', (context) => {
    console.log({ ...context.params });

    notFoundAPI(context);
  })
  .get('/api(.*)', (context) => notFoundAPI(context));

app.use(routerAPI.routes());
app.use(routerAPI.allowedMethods());

// ? cdn
const routerCDN = new Router();
routerCDN //
  .get('/cdn/:role/:resource', (context) => {
    console.log({ ...context.params });

    notFound(context);
  })
  .get('/cdn(.*)', (context) => notFound(context));

app.use(routerCDN.routes());
app.use(routerCDN.allowedMethods());

// ? 404
app.use(staticFiles('./', { redirect: true }));
app.use(notFound);

// ? listen
app.addEventListener('listen', ({ hostname, port, secure }) => {
  console.log('[stream]', `Listening on: ${secure ? 'https://' : 'http://'}${hostname ?? 'localhost'}:${port}`);
});

await app.listen({ port: 443 });
