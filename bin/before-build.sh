#!/bin/sh

node node_modules/react-scripts-auto/bin/check-version.js
node node_modules/react-scripts-auto/bin/rewrite-env.js $1
