#! /bin/sh
cd /data/gopub/nodejs/NumSecurity
/root/.nvm/versions/node/v10.14.1/bin/cnpm i
npm run stop
npm run clean
npm run prod