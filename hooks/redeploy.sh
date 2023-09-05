#!/bin/sh

cd /var/www/hand-hygiene-contest-quiz-frontend
git pull -f origin main
yarn
yarn build
rm -rf build
cp ./src/sourceQuestions.js ./building/sourceQuestions.js
mv ./building ./build
sudo service apache2 restart