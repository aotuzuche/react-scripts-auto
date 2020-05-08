#!/bin/sh

node node_modules/react-scripts-auto/bin/create-auth-container.js
node node_modules/react-scripts-auto/bin/check-version.js
node node_modules/react-scripts-auto/bin/rewrite-cdn.js $1
node node_modules/react-scripts-auto/bin/set-sentry-rc.js $1
node node_modules/react-scripts-auto/bin/save-branch.js $1
node node_modules/react-scripts-auto/bin/set-slot-content.js $1
