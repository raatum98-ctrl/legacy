import { readFileSync, writeFileSync } from 'fs';
import crypto from 'crypto';

const registryPath = '/home/tornike/Videos/POOL/registry.json';
const registryRaw = readFileSync(registryPath, 'utf8');
const registryLines = registryRaw.split('\n').filter(Boolean);
const registry = registryLines.map(line => JSON.parse(line));

const hash = crypto.createHash('sha256').update(registryRaw).digest('hex');
const timestamp = new Date().toISOString();

const bundle = {
  registry,
  signature: hash,
  timestamp,
  vault: `vault-${timestamp.replace(/[:.]/g, '-')}.tar.gz`
};

writeFileSync('/home/tornike/Videos/POOL/registry.bundle.json', JSON.stringify(bundle, null, 2));
console.log(`🔐 Immutable registry exported → registry.bundle.json`);
