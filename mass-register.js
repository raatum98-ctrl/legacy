// /opt/miner/mass-register.js
const fs = require('fs');
const workers = [];

for (let i = 1; i <= 1000; i++) {
  workers.push(JSON.stringify({
    id: `worker-${String(i).padStart(4, '0')}`,
    wallet: `RFAKE${String(i).padStart(6, '0')}`,
    chain: 'RVN',
    meta: 'legacy-ready',
    status: 'active'
  }));
}

fs.writeFileSync('/opt/miner/registry.json', workers.join('\n') + '\n');
console.log('✅ Registered 1000 workers');

