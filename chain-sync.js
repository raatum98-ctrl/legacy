import { readFileSync, writeFileSync } from 'fs';
import axios from 'axios';

const payoutPath = '/home/tornike/Videos/POOL/disbursement.json';
const chains = {
  RVN: { rpc: 'http://127.0.0.1:8766', auth: { username: 'rvnuser', password: 'rvnpass' } },
  FLUX: { rpc: 'http://127.0.0.1:16124', auth: { username: 'fluxuser', password: 'fluxpass' } }
};

const data = JSON.parse(readFileSync(payoutPath, 'utf8'));
const { workers, totalHashrate } = data;
const log = [];

async function sendToChain(chain, wallet, amount) {
  try {
    const res = await axios.post(chains[chain].rpc, {
      method: 'sendtoaddress',
      params: [wallet, amount],
      id: Date.now()
    }, { auth: chains[chain].auth });
    return res.data.result;
  } catch (e) {
    return `❌ ${chain} failed: ${e.message}`;
  }
}

async function syncChains() {
  for (const w of workers) {
    const reward = (w.hashrate / totalHashrate) * 0.5;
    const chain = w.chain || 'RVN';
    const txid = await sendToChain(chain, w.wallet, reward);
    log.push({ id: w.id, chain, wallet: w.wallet, reward, txid, timestamp: new Date().toISOString() });
    console.log(`🔗 ${w.id} → ${reward.toFixed(4)} ${chain} → ${txid}`);
  }

  writeFileSync('/home/tornike/Videos/POOL/crosschain-log.json', JSON.stringify(log, null, 2));
  console.log(`✅ Cross-chain payout complete`);
}

syncChains();

