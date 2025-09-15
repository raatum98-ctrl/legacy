const fs = require('fs');
const crypto = require('crypto');

const ledger = JSON.parse(fs.readFileSync('/opt/miner/ledger.json', 'utf8'));
let disbursement = {};

for (const [worker, data] of Object.entries(ledger)) {
  const payload = `${worker}|${data.reward}|${data.lastUpdated}`;
  const signature = crypto.createHash('sha256').update(payload).digest('hex');

  disbursement[worker] = {
    reward: data.reward,
    timestamp: data.lastUpdated,
    signature: signature
  };
}

fs.writeFileSync('/opt/miner/disbursement.json', JSON.stringify(disbursement, null, 2));
