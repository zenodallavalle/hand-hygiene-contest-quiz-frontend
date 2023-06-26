#!/bin/sh

cd /var/www/hand-hygiene-contest-quiz-frontend
git pull -f origin main
npm install
npm run build
sudo service apache2 restart