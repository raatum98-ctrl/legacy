const fs = require('fs');
const { execSync } = require('child_process');

const status = JSON.parse(fs.readFileSync('/opt/miner/status.json', 'utf8'));
const logPath = '/var/log/ceremony.log';

for (const [worker, data] of Object.entries(status)) {
  if (!data.active) {
    const scriptPath = `/opt/miner/workers/${worker}.js`;
    try {
      execSync(`node ${scriptPath}`);
      const logEntry = `${new Date().toISOString()} | ${worker} restarted via script\n`;
      fs.appendFileSync(logPath, logEntry);
    } catch (err) {
      const failLog = `${new Date().toISOString()} | ${worker} restart FAILED: ${err.message}\n`;
      fs.appendFileSync(logPath, failLog);
    }
  }
}

