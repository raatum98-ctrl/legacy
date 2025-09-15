import { readFileSync, writeFileSync } from 'fs';

const registryPath = '/home/tornike/Videos/POOL/registry.json';
const lines = readFileSync(registryPath, 'utf8').split('\n').filter(Boolean);
const registry = lines.map(line => JSON.parse(line));

const overloaded = [];
const underused = [];

registry.forEach(worker => {
  if (worker.hashrate > 20) overloaded.push(worker);
  else if (worker.hashrate < 5) underused.push(worker);
});

const balanceMap = {
  timestamp: new Date().toISOString(),
  overloaded: overloaded.map(w => w.id),
  underused: underused.map(w => w.id),
  recommendation: `Move 1 loop from each overloaded to underused`
};

writeFileSync('/home/tornike/Videos/POOL/balance.json', JSON.stringify(balanceMap, null, 2));
console.log(`⚖️ Load balance map generated → ${overloaded.length} overloaded, ${underused.length} underused`);

