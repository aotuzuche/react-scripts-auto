#!/bin/sh

easy_install oss2
node node_modules/react-scripts-auto/bin/add-public.js
node node_modules/react-scripts-auto/bin/set-sentry-script.js $1
python node_modules/react-scripts-auto/bin/oss.py $1