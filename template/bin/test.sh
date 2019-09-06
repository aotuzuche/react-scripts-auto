#!/bin/sh

yarn
yarn add auto-ui auto-libs react-scripts-auto
sh node_modules/react-scripts-auto/bin/before-build.sh 'test'
yarn __test
sh node_modules/react-scripts-auto/bin/after-build.sh 'test'
