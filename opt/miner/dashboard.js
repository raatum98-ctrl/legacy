for i in {1..10}; do
  /opt/miner/t-rex -a kawpow \
  -o stratum+tcp://pool.woolypooly.com:55555 \
  -u RMEysgjtWkzDV6xqc6i7taRu3FnXyPQLp3.gpu-thinker-$i \
  -p x \
  --intensity 16 \
  --log-path /opt/miner/logs/gpu-thinker-$i.log &
  sleep 1
done
