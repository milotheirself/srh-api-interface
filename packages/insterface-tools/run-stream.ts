let ser: Deno.Process;
let tim: ReturnType<typeof setTimeout>;

function requestBundle() {
  clearTimeout(tim);

  tim = setTimeout(async () => {
    // ?
    const p = Deno.run({
      cmd: ['deno', 'run', '-A', '--unstable', 'packages/insterface-tools/run-bundle.ts'], //
    });
    await p.status();

    // ?
    if (ser) ser.kill('SIGINT');
    ser = Deno.run({
      cwd: 'docs/.pagelet/gh-production/',
      cmd: ['deno', 'run', '--allow-net=:443', '--allow-read=./', 'index.ts'], //
    });
  }, 1000);
}

requestBundle();
for await (const _ of Deno.watchFs('./packages/insterface-content')) {
  requestBundle();
}
