import { readFileSync } from 'fs';
import axios from 'axios';

const registryPath = '/opt/miner/registry.json';
const remoteEndpoint = 'http://telemetry-node.example.com/sync';

async function pushTelemetry() {
  const lines = readFileSync(registryPath, 'utf8').split('\n').filter(Boolean);
  const registry = lines.map(line => JSON.parse(line));

  const payload = registry.map(worker => ({
    id: worker.id,
    hashrate: worker.hashrate,
    status: worker.status,
    lastSeen: worker.lastSeen
  }));

  try {
    await axios.post(remoteEndpoint, { timestamp: new Date().toISOString(), workers: payload });
    console.log(`📡 Telemetry pushed — ${payload.length} workers`);
  } catch (e) {
    console.error(`❌ Telemetry sync failed: ${e.message}`);
  }
}

setInterval(pushTelemetry, 5000);

