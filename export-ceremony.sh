#!/bin/bash
DATE=$(date +"%Y%m%d-%H%M")
cat /var/log/grind/*.log >> /var/log/ceremony.log
cp /var/log/ceremony.log /home/tornike/Videos/POOL/ceremony-$DATE.log

