import { readFileSync } from 'fs';

const registryPath = '/opt/miner/registry.json';

function renderMeta() {
  const lines = readFileSync(registryPath, 'utf8').split('\n').filter(Boolean);
  const registry = lines.map(line => JSON.parse(line));

  const metaGroups = {};

  registry.forEach(worker => {
    const meta = worker.meta || 'unknown';
    if (!metaGroups[meta]) metaGroups[meta] = [];
    metaGroups[meta].push(worker);
  });

  console.clear();
  console.log(`🧬 Meta Registry — ${new Date().toISOString()}\n`);

  for (const [meta, workers] of Object.entries(metaGroups)) {
    console.log(`🔖 ${meta} — ${workers.length} workers`);
    workers.slice(0, 5).forEach(w => {
      console.log(`  ${w.id.padEnd(20)} | ${w.status.padEnd(8)} | ${w.lastSeen}`);
    });
    if (workers.length > 5) console.log(`  ... +${workers.length - 5} more\n`);
    else console.log('');
  }
}

renderMeta();

