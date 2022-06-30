import './module/gui.js';

import { default as query } from './module/database/query.js';
import { default as patch } from './module/database/patch.js';

(async () => {
  const groups = await query.groupsAll();
  const people = await query.peopleAll();

  console.log({ groups, people });
})();
