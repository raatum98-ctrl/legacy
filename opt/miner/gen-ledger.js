const fs = require('fs');
const path = '/var/log/grind/';
const rewardPerHash = 0.000001;
let ledger = {};

for (let i = 1; i <= 1000; i++) {
  const id = `gpu-thinker-${i}`;
  const logPath = `${path}${id}.log`;

  let count = 0;
  try {
    const data = fs.readFileSync(logPath, 'utf8');
    count = (data.match(/connected to pool/g) || []).length;
  } catch (err) {
    count = 0;
  }

  ledger[id] = {
    hashes: count,
    reward: parseFloat((count * rewardPerHash).toFixed(8)),
    lastUpdated: new Date().toISOString()
  };
}

fs.writeFileSync('/opt/miner/ledger.json', JSON.stringify(ledger, null, 2));

