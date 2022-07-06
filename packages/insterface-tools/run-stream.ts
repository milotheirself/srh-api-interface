let tim: ReturnType<typeof setTimeout>;
function requestBundle() {
  clearTimeout(tim);
  tim = setTimeout(async () => {
    const p = Deno.run({ cmd: ['deno', 'run', '-A', '--unstable', 'packages/insterface-tools/run-bundle.ts'] });
    await p.status();
  }, 500);
}

requestBundle();
for await (const changes of Deno.watchFs('./packages/insterface-content')) {
  requestBundle();
}