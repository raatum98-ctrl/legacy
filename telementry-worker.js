const axios = require('axios');
const workerId = process.argv[2] || 'worker-0000';

setInterval(async () => {
  try {
    const res = await axios.get('http://127.0.0.1:4067/summary');
    const raw = res.data.hashrate_instant || 0;
    const hashrate = raw / 1_000_000; // Convert to MH/s
    await axios.post('http://127.0.0.1:3000/telemetry', {
      id: workerId,
      hashrate: hashrate
    });
    console.log(`📡 ${workerId} → ${hashrate.toFixed(2)} MH/s`);
  } catch (err) {
    console.error(`⚠️ ${workerId} → telemetry failed: ${err.message}`);
  }
}, 10000);
