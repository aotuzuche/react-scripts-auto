#!/bin/sh

git fetch
node node_modules/react-scripts-auto/bin/create-auth-container.js
node node_modules/react-scripts-auto/bin/check-version.js
node node_modules/react-scripts-auto/bin/rewrite-env.js $1
node node_modules/react-scripts-auto/bin/save-branch.js $1
node node_modules/react-scripts-auto/bin/set-slot-content.js $1
