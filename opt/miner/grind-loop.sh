#!/bin/bash
POOL="stratum+tcp://yourpool:port"
for i in {1..1000}; do
  WORKER_ID="gpu-thinker-$i"
  nohup node /opt/miner/worker.js \
    --id "$WORKER_ID" \
    --hashrate 12 \
    --pool-url "$POOL" \
    >> /var/log/grind/$WORKER_ID.log 2>&1 &
done

