#!/bin/sh

git fetch
node node_modules/react-scripts-auto/bin/create-prettierrc.js
node node_modules/react-scripts-auto/bin/add-doctor.js
node node_modules/react-scripts-auto/bin/create-auth-container.js
node node_modules/react-scripts-auto/bin/check-version.js
node node_modules/react-scripts-auto/bin/save-branch.js test
node node_modules/react-scripts-auto/bin/set-slot-content.js test
