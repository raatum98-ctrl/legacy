const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());

const registryPath = '/opt/miner/registry.json';
const logPath = '/opt/miner/server.log';

// Ensure log file exists
if (!fs.existsSync(logPath)) {
  fs.writeFileSync(logPath, '');
}

// Load registry
let registry = [];
try {
  registry = JSON.parse(fs.readFileSync(registryPath));
  console.log(`🧠 Coordinator: ${registry.length} workers loaded`);
} catch (err) {
  console.error('⚠️ Registry load failed:', err.message);
}

// Telemetry receiver
app.post('/telemetry', (req, res) => {
  const { id, hashrate } = req.body;
  if (!id || typeof hashrate !== 'number') return res.sendStatus(400);

  const mh = hashrate / 1_000_000; // ✅ convert here
  const log = `📡 ${id} → ${mh.toFixed(2)} MH/s\n`;
  fs.appendFileSync(logPath, log);
  console.log(log.trim());
  res.sendStatus(200);
});


// Status endpoint
app.get('/status', (req, res) => {
  const logData = fs.existsSync(logPath) ? fs.readFileSync(logPath, 'utf8') : '';
  const lines = logData.split('\n').filter(Boolean);

  const workerStats = {};
  lines.forEach(line => {
    const match = line.match(/📡 (worker-\d+) → ([\d.]+) MH\/s/);
   if (match) {
      const [, id, mh] = match;
      workerStats[id] = parseFloat(mh);
    }
  });

  const totalHashrate = Object.values(workerStats).reduce((a, b) => a + b, 0);
  res.json({
    workers: Object.keys(workerStats).length,
    totalHashrate: totalHashrate.toFixed(2),
    payoutReady: totalHashrate > 0
  });
});

// Start server
app.listen(3000, () => {
  console.log('🧠 Coordinator listening on port 3000');
});

app.use(cors());
app.post('/telemetry', (req, res) => {
  const { id, hashrate } = req.body;
  registry[id] = { hashrate, timestamp: Date.now() };
  res.sendStatus(200);
});
