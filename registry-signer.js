import { readFileSync, writeFileSync } from 'fs';
import crypto from 'crypto';

const registryPath = '/opt/miner/registry.json';
const lines = readFileSync(registryPath, 'utf8').split('\n').filter(Boolean);

const signatures = lines.map(line => {
  const hash = crypto.createHash('sha256').update(line).digest('hex');
  const worker = JSON.parse(line);
  return {
    id: worker.id,
    signature: hash,
    timestamp: new Date().toISOString()
  };
});

writeFileSync('/opt/miner/registry.sig', JSON.stringify(signatures, null, 2));
console.log(`🪪 Registry signed — ${signatures.length} entries`);

