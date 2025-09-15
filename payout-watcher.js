// /opt/miner/payout-watcher.js
const axios = require('axios');

const COORDINATOR_STATUS = 'http://127.0.0.1:3000/status';
const PAYOUT_TRIGGER = 'http://127.0.0.1:3000/payout';

async function monitor() {
  while (true) {
    try {
      const res = await axios.get(COORDINATOR_STATUS);
      const total = parseFloat(res.data.totalHashrate);

      if (total > 1000) {
        console.log(`💰 Triggering payout → ${total.toFixed(2)} MH/s`);
        await axios.post(PAYOUT_TRIGGER);
        break;
      } else {
        console.log(`⏳ Waiting → ${total.toFixed(2)} MH/s`);
      }
    } catch (err) {
      console.log(`❌ Payout watcher error: ${err.message}`);
    }

    await new Promise(r => setTimeout(r, 10000)); // check every 10s
  }
}

monitor();
