const fs = require('fs');
const lines = fs.readFileSync('/opt/miner/registry.json', 'utf8').split('\n');

lines.forEach((line, index) => {
  try {
    JSON.parse(line);
  } catch (e) {
    console.log(`❌ Syntax error at line ${index + 1}: ${line}`);
  }
});
