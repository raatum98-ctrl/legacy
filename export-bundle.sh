#!/bin/bash
DATE=$(date +"%Y%m%d-%H%M")
DEST="/home/tornike/Videos/POOL/legacy-$DATE"
mkdir -p "$DEST"

cp /var/log/ceremony.log "$DEST/"
cp /var/log/payout.log "$DEST/"
cp /opt/miner/registry.json "$DEST/"
cp /opt/miner/ledger.json "$DEST/"
cp /opt/miner/disbursement.json "$DEST/"

tar -czvf "$DEST.tar.gz" -C "$DEST" .
