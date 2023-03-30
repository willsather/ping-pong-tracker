#!/usr/bin/env sh
set -e

echo "Ship It"
git pull -r
cd frontend
npm run lint
npm run test:ci
cd ..
git push
echo "Shipped It!"
