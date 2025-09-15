import { readFileSync, writeFileSync } from 'fs';

const registry = JSON.parse(readFileSync('/opt/miner/registry.sig', 'utf8'));
const payout = JSON.parse(readFileSync('/opt/miner/disbursement.json', 'utf8'));

const audit = {
  timestamp: new Date().toISOString(),
  totalHashrate: payout.totalHashrate,
  workers: registry.map(entry => ({
    id: entry.id,
    signature: entry.signature,
    reward: payout.workers.find(w => w.id === entry.id)?.hashrate || 0
  }))
};

writeFileSync('/opt/miner/audit.json', JSON.stringify(audit, null, 2));
console.log(`📜 Audit trail generated`);

