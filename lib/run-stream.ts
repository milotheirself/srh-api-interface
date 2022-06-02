import { default as database } from './worker/database.ts';
import { default as streamer } from './worker/streams.ts';

import 'https://raw.githubusercontent.com/daychongyang/dotenv/master/load.ts';

streamer.connectedCallback({
  // ...
});

// database.connectedCallback({
//   credentials: {
//     hostname: Deno.env.get('DB_HOST'),
//     username: Deno.env.get('DB_USER'),
//     password: Deno.env.get('DB_PASS'),
//   },
// });

// streamer.disconnectedCallback();
// database.disconnectedCallback();
