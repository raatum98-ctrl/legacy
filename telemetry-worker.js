const axios = require('axios');
const workerId = process.argv[2] || 'worker-0000';

setInterval(async () => {
  try {
    const res = await axios.get('http://127.0.0.1:4067/summary');
    const raw = res.data.hashrate_instant;
if (!raw || raw === 0) {
  console.log(`⚠️ ${workerId} → hashrate not ready`);
  return;
}
    const hashrate = raw / 1_000_000;
setTimeout(() => {
  // telemetry logic
}, 5000); // poll every 5 seconds

    await axios.post('http://127.0.0.1:3000/telemetry', {
       id: workerId,
       hashrate: hashrate
     });
    console.log(`📡 ${workerId} → ${hashrate} MH/s`);
  } catch (err) {
  console.error(`⚠️ ${workerId} → telemetry failed: ${err.message}`);
  }
}, 10000);
