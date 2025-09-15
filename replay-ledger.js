// /opt/miner/replay-ledger.js
const fs = require('fs');
const crypto = require('crypto');

const LEDGER_PATH = '/opt/miner/ledger.json';
const REGISTRY_PATH = '/opt/miner/legacy-registry.json';

function verifyLedger(filePath) {
  const data = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha256').update(data).digest('hex');

  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH));
  const match = registry.find(entry => entry.hash === hash);

  if (match) {
    console.log(`✅ Verified ledger → ${match.timestamp}`);
    return JSON.parse(data);
  } else {
    console.log(`❌ Ledger hash not found in registry`);
    return null;
  }
}

const ledger = verifyLedger(LEDGER_PATH);
if (ledger) {
  ledger.forEach(w => {
    console.log(`📜 ${w.id} → ${w.hashrate} H/s → payout: ${w.payout}`);
  });
}
