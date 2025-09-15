import { execSync } from 'child_process';
import fs from 'fs';

function spawnCeremony() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const dir = `/home/tornike/Videos/POOL/CEREMONY-${timestamp}`;
  fs.mkdirSync(dir, { recursive: true });

  // Copy base templates
  execSync(`cp /home/tornike/Videos/POOL/registry.template.json ${dir}/registry.json`);
  execSync(`cp /home/tornike/Videos/POOL/server.js ${dir}/server.js`);

  // Launch coordinator
  execSync(`node ${dir}/server.js &`);

  console.log(`🧬 Ceremony spawned → ${dir}`);
}

setInterval(spawnCeremony, 6 * 60 * 60 * 1000); // ყოველ 6 საათში

