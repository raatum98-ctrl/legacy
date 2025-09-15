// /opt/miner/ledger-export.js
const axios = require('axios');
const fs = require('fs');

const COORDINATOR_DATA = 'http://127.0.0.1:3000/workers';
const LEDGER_PATH = '/opt/miner/ledger.json';
const TOTAL_REWARD = 1000; // RVN or any unit

(async () => {
  try {
    const res = await axios.get(COORDINATOR_DATA);
    const workers = res.data;

    const totalHashrate = workers.reduce((sum, w) => sum + w.hashrate, 0);

    const ledger = workers.map(w => {
      const share = (w.hashrate / totalHashrate) * TOTAL_REWARD;
      return {
        id: w.id,
        hashrate: w.hashrate,
        payout: parseFloat(share.toFixed(4))
      };
    });

    fs.writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 2));
    console.log(`📜 Ledger written → ${LEDGER_PATH}`);
  } catch (err) {
    console.error(`❌ Ledger export failed: ${err.message}`);
  }
})();
