import { copy, emptyDir } from 'https://deno.land/std@0.78.0/fs/mod.ts';

{
  const out = './docs/.pagelet/gh-pages';
  await emptyDir(`${out}`);

  // ? clone only statics
  for await (const nod of Deno.readDir('./packages/insterface-content/page')) //
    await copy(`./packages/insterface-content/page/${nod.name}`, `${out}/${nod.name}`);
}

{
  const out = './docs/.pagelet/gh-production';
  await emptyDir(`${out}`);

  // ? clone statics
  for await (const nod of Deno.readDir('./packages/insterface-tools/static')) //
    await copy(`./packages/insterface-tools/static/${nod.name}`, `${out}/${nod.name}`);
  for await (const nod of Deno.readDir('./packages/insterface-content/page')) //
    await copy(`./packages/insterface-content/page/${nod.name}`, `${out}/${nod.name}`);
}
