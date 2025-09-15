import { readFileSync, writeFileSync } from 'fs';

const registryPath = '/opt/miner/gpu-registry.json';
const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
const now = Date.now();
const threshold = 60 * 1000; // 60 წამი

let revived = [];

for (const [id, worker] of Object.entries(registry)) {
  const lastSeen = new Date(worker.lastSeen).getTime();
  if (now - lastSeen > threshold) {
    console.log(`🔄 Reviving ${id}...`);
    registry[id].status = 'revived';
    registry[id].lastSeen = new Date().toISOString();
    revived.push(id);
    // აქ შეგიძლია miner-ის ხელახლა გაშვება ჩასვა
  }
}

writeFileSync(registryPath, JSON.stringify(registry, null, 2));
console.log(`✅ Revived ${revived.length} processors`);

