const fragment: { [prop: string]: any } = {};
const internal: { [prop: string]: any } = {};

import { Client, ClientConfig } from 'https://deno.land/x/mysql@v2.10.2/mod.ts';

/**
 * @returns {Promise<void>}
 */
fragment.whenConnected = (): Promise<void> => internal.connect;
internal.connect = new Promise((res) => (internal.resolveConnected = res));

/**
 * @param {ClientConfig}
 * @returns {Promise<void>}
 */
fragment.connectedCallback = async (config: ClientConfig) => {
  internal.client = await new Client().connect(config);
  internal.resolveConnected();
};

/**
 * @returns {Promise<void>}
 */
fragment.disconnectedCallback = async (): Promise<void> => {
  await internal.client.close();
};

/**
 * @param {string} sql
 * @returns {Promise<any>}
 */
fragment.execute = (sql: string): Promise<any> => {
  internal.executePrint(sql);
  return internal.client.execute(sql);
};

/**
 * @param {string} sql
 * @returns {void}
 */
internal.executePrint = (sql: string): void => {
  let cal: string[] = sql.split('\n');
  let ins: null | number = null;

  if (cal[0].trim() == '') cal = cal.slice(1);
  if (cal[cal.length - 1].trim() == '') cal = cal.slice(0, -1);

  cal.forEach((s: string) => {
    const l = s.match(/^\s*/)![0].length;
    if (l != 0 && (ins == null || l < ins)) ins = l;
  });

  sql = cal.map((c) => c.slice(ins || 0)).join('\n');

  console.log('>>>>>>>');
  console.log(sql);
  console.log('<<<<<<<\n');
};

export default { ...fragment };
