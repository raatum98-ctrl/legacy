const axios = require('axios');
const fs = require('fs');

const registry = fs.readFileSync('/opt/miner/registry.json', 'utf8')
  .split('\n').filter(Boolean).map(line => JSON.parse(line));

const rpc = 'http://127.0.0.1:8766';
const auth = { username: 'rvnuser', password: 'rvnpass' };

async function sendRVN(wallet, amount) {
  const res = await axios.post(rpc, {
    method: 'sendtoaddress',
    params: [wallet, amount],
    id: Date.now()
  }, { auth });
  return res.data.result;
}

(async () => {
  for (const w of registry) {
    const txid = await sendRVN(w.wallet, 0.5);
    console.log(`💰 ${w.id} → 0.5 RVN → ${txid}`);
  }
})();

