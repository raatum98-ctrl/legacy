// /opt/miner/swarm.js
const axios = require('axios');

const TOTAL_WORKERS = 2000;
const COORDINATOR_URL = 'http://main-coordinator:3000/telemetry';
const MINER_API = 'http://127.0.0.1:4067/summary';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function spawnWorker(id) {
  const workerId = `worker-${id.toString().padStart(4, '0')}`;

  while (true) {
    try {
      const res = await axios.get(MINER_API);
      const raw = res.data.hashrate_instant;

      if (!raw || raw === 0) {
        console.log(`⚠️ ${workerId} → hashrate not ready`);
      } else {
        const hashrate = raw;
        await axios.post(COORDINATOR_URL, {
          id: workerId,
          hashrate
        });
        console.log(`📡 ${workerId} → ${(hashrate / 1_000_000).toFixed(2)} MH/s`);
      }
    } catch (err) {
      console.log(`❌ ${workerId} → telemetry failed`);
    }

    await delay(5000); // Poll every 5 seconds
  }
}

(async () => {
  for (let i = 1; i <= TOTAL_WORKERS; i++) {
    spawnWorker(i);
    await delay(100); // throttle spawn rate
  }
})();
