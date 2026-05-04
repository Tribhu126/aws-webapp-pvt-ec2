#!/bin/bash
set -e
cd ~/aws-webapp-pvt-ec2

echo "Pull latest code"
git pull origin main

echo "Restart app"
pm2 restart app.js || pm2 start app.js
pm2 save
