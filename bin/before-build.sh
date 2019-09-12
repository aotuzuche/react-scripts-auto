#!/bin/sh

node node_modules/react-scripts-auto/bin/check-version.js
node node_modules/react-scripts-auto/bin/rewrite-env.js $1
node node_modules/react-scripts-auto/bin/set-slot-content.js $1