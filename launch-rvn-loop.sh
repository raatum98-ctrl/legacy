#!/bin/bash
TREX="/opt/miner/t-rex"
POOL="stratum+tcp://pool.woolypooly.com:55555"
WALLET="RMEysgjtWkzDV6xqc6i7taRu3FnXyPQLp3"

for i in {1..1000}
do
  WORKER="gpu-thinker-$i"
  LOG="/var/log/$WORKER.log"
  $TREX -a kawpow -o $POOL -u ${WALLET}.${WORKER} -p x --log-path $LOG &
done
