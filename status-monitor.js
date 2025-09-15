const fs = require('fs');
const path = '/var/log/grind/';
let status = {};

for (let i = 1; i <= 1000; i++) {
  const id = `gpu-thinker-${i}`;
  const logPath = `${path}${id}.log`;

  let lastSeen = "never";
  let active = false;

  try {
    const data = fs.readFileSync(logPath, 'utf8');
    const lines = data.trim().split('\n');
    const lastLine = lines[lines.length - 1];

    if (lastLine.includes("connected to pool")) {
      lastSeen = lastLine.split('|')[0].trim();
      active = true;
    }
  } catch (err) {
    lastSeen = "missing";
  }

  status[id] = {
    active: active,
    lastSeen: lastSeen
  };
}

fs.writeFileSync('/opt/miner/status.json', JSON.stringify(status, null, 2));
