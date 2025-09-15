const fs = require('fs');

const registry = fs.readFileSync('/opt/miner/registry.json', 'utf8');
const payout = fs.readFileSync('/opt/miner/disbursement.json', 'utf8');

const bundle = {
  timestamp: new Date().toISOString(),
  registry: registry.split('\n').filter(Boolean).map(line => JSON.parse(line)),
  payout: JSON.parse(payout)
};

fs.writeFileSync('/opt/miner/legacy.json', JSON.stringify(bundle, null, 2));
fs.writeFileSync('/opt/miner/meta.txt', `Legacy bundle created at ${bundle.timestamp}\nProcessors: ${bundle.registry.length}\nTotal Hashrate: ${bundle.payout.totalHashrate} MH/s`);
fs.writeFileSync('/opt/miner/README.md', `# Ceremony Snapshot\n\n- Timestamp: ${bundle.timestamp}\n- Processors: ${bundle.registry.length}\n- Hashrate: ${bundle.payout.totalHashrate} MH/s\n- Status: Sealed\n`);

console.log('📦 Legacy bundle exported');

