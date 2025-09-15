#!/bin/bash
TOTAL_HASHES=$(grep -c "connected to pool" /var/log/grind/*.log)
REWARD_PER_HASH=0.000001  # adjust based on pool payout
TOTAL_REWARD=$(echo "$TOTAL_HASHES * $REWARD_PER_HASH" | bc)

echo "$(date) | Total Hashes: $TOTAL_HASHES | Total Reward: $TOTAL_REWARD" >> /var/log/payout.log

