// /opt/miner/notarize-ledger.js
const fs = require('fs');
const crypto = require('crypto');

const LEDGER_PATH = '/opt/miner/ledger.json';
const REGISTRY_PATH = '/opt/miner/legacy-registry.json';

function hashLedger(filePath) {
  const data = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(data).digest('hex');
}

function notarize(hash) {
  const timestamp = new Date().toISOString();
  const entry = { hash, timestamp };

  let registry = [];
  if (fs.existsSync(REGISTRY_PATH)) {
    registry = JSON.parse(fs.readFileSync(REGISTRY_PATH));
  }

  registry.push(entry);
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));
  console.log(`🔐 Ledger notarized → ${hash}`);
}

const hash = hashLedger(LEDGER_PATH);
notarize(hash);
