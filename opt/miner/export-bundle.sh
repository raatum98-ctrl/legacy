#!/bin/bash
DATE=$(date +"%Y%m%d-%H%M")
mkdir -p /home/tornike/Videos/POOL/legacy-$DATE

cp /var/log/ceremony.log /home/tornike/Videos/POOL/legacy-$DATE/
cp /var/log/payout.log /home/tornike/Videos/POOL/legacy-$DATE/
cp /opt/miner/registry.json /home/tornike/Videos/POOL/legacy-$DATE/
cp /opt/miner/ledger.json /home/tornike/Videos/POOL/legacy-$DATE/

