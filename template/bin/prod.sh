#!/bin/sh

yarn
yarn add auto-ui react-scripts-auto
sh node_modules/react-scripts-auto/bin/before-build.sh
yarn __build
sh node_modules/react-scripts-auto/bin/after-build.sh
