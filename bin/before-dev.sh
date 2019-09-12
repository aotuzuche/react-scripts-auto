#!/bin/sh

node node_modules/react-scripts-auto/bin/check-version.js
node node_modules/react-scripts-auto/bin/save-branch.js test
node node_modules/react-scripts-auto/bin/set-slot-content.js test
