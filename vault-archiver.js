import { execSync } from 'child_process';
import fs from 'fs';

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const vaultDir = `/opt/miner/vault/${timestamp}`;
fs.mkdirSync(vaultDir, { recursive: true });

const files = [
  'registry.json',
  'disbursement.json',
  'audit.json',
  'legacy.json',
  'registry.sig',
  'meta.txt',
  'README.md'
];

files.forEach(file => {
  execSync(`cp /opt/miner/${file} ${vaultDir}/`);
});

execSync(`tar -czf /opt/miner/vault-${timestamp}.tar.gz -C /opt/miner/vault ${timestamp}`);
console.log(`🔐 Ceremony archived → vault-${timestamp}.tar.gz`);

