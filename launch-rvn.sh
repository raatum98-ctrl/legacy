#!/bin/bash
TREX="/opt/miner/t-rex-0.26.6/t-rex"

for i in {1..1000}
do
  $TREX -a kawpow \
  -o stratum+tcp://stratum.ravenminer.com:3838 \
  -u RHMKPy3Ana5NyzTgo6qWXXMiHAxzPyMgG1.gpu-thinker-$i \
  --log-path /var/log/gpu-thinker-$i.log &
done
