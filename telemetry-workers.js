const axios = require('axios');
const { execSync } = require('child_process');

const workerId = process.argv[2] || 'worker-0001';

function getHashrate() {
  try {
    const output = execSync('curl -s http://127.0.0.1:4067/summary').toString();
    const json = JSON.parse(output);
    return json.hashrate?.total?.[0] || 0;
  } catch {
    return 0;
  }
}

setInterval(() => {
  const hashrate = getHashrate();
  axios.post('http://127.0.0.1:3000/telemetry', {
    id: workerId,
    hashrate
  }).catch(() => {});
}, 10000);

for i in $(seq -w 1 1000); do
  node /opt/miner/telemetry-worker.js worker-$i &
  sleep 0.2
done

