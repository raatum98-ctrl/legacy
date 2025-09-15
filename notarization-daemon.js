import { readFileSync, writeFileSync } from 'fs';
import os from 'os';

const registryPath = '/home/tornike/Videos/POOL/registry.json';
const hostname = os.hostname();
const lines = readFileSync(registryPath, 'utf8').split('\n').filter(Boolean);

const resolved = lines.map(line => {
  const worker = JSON.parse(line);
  worker.origin = hostname;
  worker.signature = Buffer.from(worker.id + worker.wallet).toString('base64');
  return JSON.stringify(worker);
});

writeFileSync(registryPath, resolved.join('\n') + '\n');
console.log(`🧬 Worker identities resolved → ${resolved.length} entries`);

