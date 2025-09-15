const fs = require('fs');
const spawn = require('child_process').spawn;
const basePath = '/opt/miner/logs/';
const binary = '/home/tornike/Videos/POOL/t-rex';

for (let i = 1; i <= 1000; i++) {
  const workerID = `cpu-thinker-${i}`;
  const logPath = `${basePath}${workerID}.log`;
  const wallet = `RMEysgjtWkzDV6xqc6i7taRu3FnXyPQLp3.${workerID}`;

  const args = [
    '-a', 'kawpow',
    '-o', 'stratum+tcp://pool.woolypooly.com:55555',
    '-u', wallet,
    '-p', 'x',
    '--intensity', '12',
    '--gpu-init-mode', '1',
    '--log-path', logPath
  ];

  const miner = spawn(binary, args, { detached: true });
  miner.unref();

  fs.appendFileSync('/opt/miner/registry.json', JSON.stringify({
    id: workerID,
    wallet,
    log: logPath,
    created: new Date().toISOString(),
    status: 'launched'
  }) + '\n');
}

