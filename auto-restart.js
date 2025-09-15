import { readFileSync, writeFileSync } from 'fs';
import { exec } from 'child_process';

const registryPath = '/opt/miner/registry.json';
const threshold = 60 * 1000; // 60 წამი

function reviveDeadWorkers() {
  const lines = readFileSync(registryPath, 'utf8').split('\n').filter(Boolean);
  const registry = lines.map(line => JSON.parse(line));
  const now = Date.now();
  let revived = [];

  registry.forEach(worker => {
    const lastSeen = new Date(worker.lastSeen).getTime();
    if (now - lastSeen > threshold || worker.status === 'dead') {
      console.log(`🔄 Restarting ${worker.id}...`);
      exec(`node /opt/miner/workers/${worker.id}.js`, (err) => {
        if (err) console.error(`❌ Failed to restart ${worker.id}`);
      });
      worker.status = 'revived';
      worker.lastSeen = new Date().toISOString();
      revived.push(worker);
    }
  });

  const updated = revived.map(w => JSON.stringify(w)).join('\n');
  writeFileSync(registryPath, updated + '\n');
  console.log(`✅ Revived ${revived.length} workers`);
}

setInterval(reviveDeadWorkers, 5000);

