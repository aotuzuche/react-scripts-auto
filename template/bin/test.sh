yarn
yarn add auto-ui auto-libs react-scripts-auto
python node_modules/react-scripts-auto/bin/before-build.py test
yarn __test
easy_install oss2
python node_modules/react-scripts-auto/bin/after-build.py test
