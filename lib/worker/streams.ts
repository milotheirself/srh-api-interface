const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

import { serve } from 'https://deno.land/std@0.130.0/http/server.ts';
import { urlParse } from 'https://deno.land/x/url_parse@1.1.0/mod.ts';

import { default as api } from './api/index.ts';
import { default as cdn } from './cdn/index.ts';

fragment.connectedCallback = async () => {
  const handler = async (req: Request): Promise<Response> => {
    const loc = urlParse(req.url);

    switch (true) {
      case loc.pathname.startsWith('/cdn/'):
        return internal.requestCDN({ req, loc });

      case loc.pathname.startsWith('/api/'):
        return internal.requestAPI({ req, loc });

      default:
        return internal.requestStatic({ req, loc });
    }
  };

  console.log(`
HTTP webserver running. Access it at –

  ${`http://localhost:8080/`}
`);

  serve(handler, { port: 8080 });
};

fragment.disconnectedCallback = () => {
  // ...
};

internal.requestStatic = async ({ loc }: { [prop: string]: any }) => {
  let loa: Uint8Array | null = null;
  let typ = true; //Deno.FileInfo | null = null;
  let fil: string[] = [
    `lib/hosted${loc.pathname}`, //
    `lib/hosted${loc.pathname}index.html`,
    `lib/hosted${loc.pathname}/index.html`,
    `lib/hosted/404.html`,
  ];

  let mat = 0;

  for (const key in fil) {
    try {
      const file = await Deno.readFile(fil[key]);
      // const type = await Deno.stat(fil[key]);
      loa = file;
      mat = fil[key].endsWith('js') ? 0 : 1;
      break;
    } catch (err) {}
  }

  return loa && typ
    ? mat == 0
      ? new Response(loa, {
          headers: { 'content-type': 'text/javascript; charset=utf-8' },
          status: 200,
        })
      : new Response(loa, {
          headers: { 'content-type': 'text/html; charset=utf-8' },
          status: 200,
        })
    : new Response(loa, { status: 404 });
};

internal.requestCDN = async ({ req, loc }: { [prop: string]: any }) => {
  return internal.requestStatic({ loc });
};

internal.requestAPI = async ({ req, loc }: { [prop: string]: any }) => {
  // request data
  if (req.method == 'GET') {
    console.log(`>>>>>>> ${req.method} ${loc.pathname}`);
    console.log('<<<<<<<\n');

    return api.query.request({ urn: loc.pathname });
  }

  // ? request overwrite of existing data
  if (req.method == 'PATCH') {
    const data = await req.json();

    console.log(`>>>>>>> ${req.method} ${loc.pathname}`);
    console.log(data);
    console.log('<<<<<<<\n');

    return api.patch.request({ urn: loc.pathname, val: data });
  }

  // ? request delete of existing data
  if (req.method == 'DELETE') {
    console.log(`>>>>>>> ${req.method} ${loc.pathname}`);
    console.log('<<<<<<<\n');
  }

  // ? resolve with json 404 when request not resolvable
  return new Response(JSON.stringify({ message: '404: Not Found', code: 0 }), {
    headers: { 'content-type': 'application/json' },
    status: 404,
  });
};

export default { ...fragment };
