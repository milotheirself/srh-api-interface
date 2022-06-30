import { default as database } from './worker/database.ts';
import { default as streamer } from './worker/streams.ts';

import 'https://raw.githubusercontent.com/daychongyang/dotenv/master/load.ts';

streamer.connectedCallback({
  // ...
});

// database.connectedCallback({
//   credentials: {
//     hostname: Deno.env.get('XAMPP_SDK_HOST'),
//     username: Deno.env.get('XAMPP_SDK_USER'),
//     password: Deno.env.get('XAMPP_SDK_PASS'),
//   },
// });

// streamer.disconnectedCallback();
// database.disconnectedCallback();
