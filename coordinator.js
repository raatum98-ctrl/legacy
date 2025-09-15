import axios from 'axios';

const nodes = [
  'http://192.168.1.101:8080',
  'http://192.168.1.102:8080',
  'http://192.168.1.103:8080'
];

async function fetchTelemetry(node) {
  try {
    const res = await axios.get(`${node}/telemetry`);
    return res.data;
  } catch (e) {
    console.error(`❌ Failed to fetch from ${node}`);
    return [];
  }
}

async function aggregateTelemetry() {
  let totalHashrate = 0;
  let allWorkers = [];

  for (const node of nodes) {
    const workers = await fetchTelemetry(node);
    workers.forEach(w => totalHashrate += w.hashrate);
    allWorkers.push(...workers);
  }

  console.clear();
  console.log(`🧠 Multi-Server Telemetry — ${new Date().toISOString()}`);
  console.log(`🌐 Nodes: ${nodes.length}`);
  console.log(`⚡ Total Hashrate: ${totalHashrate.toFixed(2)} MH/s`);
  console.log(`👷 Workers: ${allWorkers.length}`);
}

setInterval(aggregateTelemetry, 5000);

