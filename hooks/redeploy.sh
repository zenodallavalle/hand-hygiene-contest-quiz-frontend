#!/bin/sh

git pull -f origin main
yarn
yarn build
rm -rf build
cp ./src/sourceQuestions.js ./building/sourceQuestions.js
echo "Copy or move ./building to your server folder and restart apache2"