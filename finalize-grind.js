import { readFileSync, writeFileSync } from 'fs';
import crypto from 'crypto';
import { randomUUID } from 'crypto';

const registryRaw = readFileSync('/home/tornike/Videos/POOL/registry.json', 'utf8');
const vaultRaw = readFileSync('/home/tornike/Videos/POOL/vault-20250915-150833.tar.gz');
const notarization = JSON.parse(readFileSync('/home/tornike/Videos/POOL/notarization.json', 'utf8'));
const reputation = JSON.parse(readFileSync('/home/tornike/Videos/POOL/reputation.json', 'utf8'));
const payout = JSON.parse(readFileSync('/home/tornike/Videos/POOL/disbursement.json', 'utf8'));

const finalization = {
  ceremonyId: randomUUID(),
  timestamp: new Date().toISOString(),
  registryHash: crypto.createHash('sha256').update(registryRaw).digest('hex'),
  vaultHash: crypto.createHash('sha256').update(vaultRaw).digest('hex'),
  notarizationTx: notarization.ledgerTx || 'N/A',
  reputationSnapshot: reputation,
  payoutSummary: payout.workers.map(w => ({ id: w.id, wallet: w.wallet, reward: w.hashrate }))
};

writeFileSync('/home/tornike/Videos/POOL/finalization.json', JSON.stringify(finalization, null, 2));
console.log(`🔐 Grind finalized → ceremonyId: ${finalization.ceremonyId}`);

