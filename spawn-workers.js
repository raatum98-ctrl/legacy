const { spawn } = require('child_process');
const fs = require('fs');

const registryRaw = fs.readFileSync('/opt/miner/registry.json', 'utf8');
const lines = registryRaw.split('\n').filter(Boolean);
const workers = lines.map(line => JSON.parse(line));

workers.forEach(worker => {
  const proc = spawn('node', ['/opt/miner/telemetry-worker.js', worker.id], {
    detached: true,
    stdio: 'ignore'
  });
  proc.unref();
});
for i in $(seq -w 1 1000); do
  sleep 30 && node /opt/miner/telemetry-worker.js worker-$i &
  sleep 0.2
done


console.log(`🚀 Spawned ${workers.length} telemetry loops`);

