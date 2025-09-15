import { readFileSync } from 'fs';

const registryPath = '/opt/miner/gpu-registry.json';

function renderDashboard() {
  const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
  let totalHashrate = 0;
  let active = 0;

  console.clear();
  console.log(`🧠 Grind Telemetry — ${new Date().toISOString()}\n`);

  for (const [id, worker] of Object.entries(registry)) {
    const { hashrate, status, lastSeen } = worker;
    totalHashrate += hashrate;
    if (status === 'active') active++;

    console.log(`${id.padEnd(20)} | ${String(hashrate).padStart(6)} MH/s | ${status.padEnd(8)} | ${lastSeen}`);
  }

  console.log(`\n⚡ Total Hashrate: ${totalHashrate.toFixed(2)} MH/s`);
  console.log(`✅ Active Processors: ${active}`);
}

setInterval(renderDashboard, 1000);

