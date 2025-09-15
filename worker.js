const args = require('minimist')(process.argv.slice(2));
const { exec } = require('child_process');
const id = args.id;
const rate = args.hashrate;
const pool = args['pool-url'];

function log(msg) {
  console.log(`${new Date().toISOString()} | ${id} | ${rate} MH/s | ${msg}`);
}

function grind() {
  log('start');
  exec(`./trex-adapter --worker ${id} --rate ${rate} --pool ${pool}`, (err) => {
    if (err) log('error');
    else log('done');
  });
}

grind();

