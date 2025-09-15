const fs = require('fs');
let registry = {};

for (let i = 1; i <= 1000; i++) {
  const id = `gpu-thinker-${i}`;
  registry[id] = {
    hashrate: 12,
    status: "active",
    meta: "legacy-ready",
    lastSeen: new Date().toISOString()
  };
}

fs.writeFileSync('/opt/miner/registry.json', JSON.stringify(registry, null, 2));

