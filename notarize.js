const fs = require('fs');
const crypto = require('crypto');

const registryRaw = fs.readFileSync('/opt/miner/registry.json', 'utf8');
const vaultRaw = fs.readFileSync('/opt/miner/vault-20250915-150833.tar.gz');

const registryHash = crypto.createHash('sha256').update(registryRaw).digest('hex');
const vaultHash = crypto.createHash('sha256').update(vaultRaw).digest('hex');
const timestamp = new Date().toISOString();

const notarization = {
  registryHash,
  vaultHash,
  timestamp,
  rvnTxid: 'FAKE_TXID_FOR_DEMO'
};

fs.writeFileSync('/opt/miner/notarization.json', JSON.stringify(notarization, null, 2));
console.log(`📜 Ceremony notarized → ${notarization.timestamp}`);

