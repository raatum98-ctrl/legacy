const fs = require('fs');
const path = '/opt/miner/logs/';
const ledgerPath = '/opt/miner/ledger.json';
let ledger = {};

try {
  ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
} catch (err) {
  ledger = {};
}

for (let i = 1; i <= 1000; i++) {
  const worker = `gpu-thinker-${i}`;
  const logFile = `${path}${worker}.log`;

  try {
    const log = fs.readFileSync(logFile, 'utf8');
    const lines = log.trim().split('\n').reverse();

    let hashrate = 0;
    let accepted = 0;
    let rejected = 0;

    for (const line of lines) {
      if (line.includes('INFO') && line.includes('GPU #0')) {
        const match = line.match(/GPU #0: (\d+\.\d+) MH\/s/);
        if (match) {
          hashrate = parseFloat(match[1]);
          break;
        }
      }
    }

    for (const line of lines) {
      if (line.includes('INFO') && line.includes('Share accepted')) accepted++;
      if (line.includes('WARN') && line.includes('Share rejected')) rejected++;
    }

    ledger[worker] = {
      hashrate,
      accepted,
      rejected,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    ledger[worker] = {
      hashrate: 0,
      accepted: 0,
      rejected: 0,
      timestamp: "log missing"
    };
  }
}

fs.writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2));
console.log("✅ Ravencoin telemetry synced to ledger.json");
