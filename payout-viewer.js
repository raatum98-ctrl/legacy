import { readFileSync } from 'fs';

const payoutPath = '/opt/miner/disbursement.json';

function renderPayout() {
  const data = JSON.parse(readFileSync(payoutPath, 'utf8'));
  const { workers, totalHashrate } = data;

  console.clear();
  console.log(`💰 Payout Disbursement — ${data.created}\n`);
  console.log(`⚡ Total Hashrate: ${totalHashrate.toFixed(2)} MH/s\n`);

  workers.forEach(({ id, wallet, hashrate }) => {
    const reward = (hashrate / totalHashrate) * 100; // პროცენტულად
    console.log(`${id.padEnd(20)} | ${String(hashrate).padStart(6)} MH/s | ${wallet} | ${reward.toFixed(2)}%`);
  });
}

renderPayout();

