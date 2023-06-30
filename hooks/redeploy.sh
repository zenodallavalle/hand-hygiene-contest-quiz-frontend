#!/bin/sh

cd /var/www/hand-hygiene-contest-quiz-frontend
git pull -f origin main
yarn
yarn build
rm -rf build
mv ./building ./build
sudo service apache2 restart