import { readFileSync, writeFileSync } from 'fs';

const registryPath = '/home/tornike/Videos/POOL/registry.json';
const payoutPath = '/home/tornike/Videos/POOL/disbursement.json';

const registryLines = readFileSync(registryPath, 'utf8').split('\n').filter(Boolean);
const payoutData = JSON.parse(readFileSync(payoutPath, 'utf8'));

const reputation = registryLines.map(line => {
  const worker = JSON.parse(line);
  const payout = payoutData.workers.find(w => w.id === worker.id);
  const trustScore = worker.status === 'active' ? 100 : worker.status === 'revived' ? 60 : 30;
  const reviveCount = worker.meta === 'revived' ? 1 : 0;

  return {
    id: worker.id,
    trustScore,
    reviveCount,
    lastPayout: payout?.timestamp || null,
    meta: worker.meta || 'unknown'
  };
});

writeFileSync('/home/tornike/Videos/POOL/reputation.json', JSON.stringify(reputation, null, 2));
console.log(`🧠 Reputation engine generated → ${reputation.length} entries`);

