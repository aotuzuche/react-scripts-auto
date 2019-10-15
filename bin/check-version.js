/**
  检测依赖的版本
 */
const version = require('./version')
const fetchRepoVersion = version.fetchRepoVersion
const fetchLocalPackageVersion = version.fetchLocalPackageVersion

Promise.all([
  fetchRepoVersion('auto-libs'),
  fetchLocalPackageVersion('auto-libs'),
  fetchRepoVersion('auto-ui'),
  fetchLocalPackageVersion('auto-ui'),
  fetchRepoVersion('react-scripts-auto'),
  fetchLocalPackageVersion('react-scripts-auto'),
  fetchRepoVersion('eslint-config-atzuche'),
  fetchLocalPackageVersion('eslint-config-atzuche'),
  fetchRepoVersion('vconsole-atzuche-env'),
  fetchLocalPackageVersion('vconsole-atzuche-env'),
  fetchRepoVersion('vconsole-atzuche-webpack-plugin'),
  fetchLocalPackageVersion('vconsole-atzuche-webpack-plugin'),
]).then((res) => {
  if (res[1] !== res[0]) {
    console.log(`[WRONG] auto-libs 包不是最新版本，当前版本为 ${res[1]}，请升级至 ${res[0]}`)
    console.log('        yarn add auto-libs')
  } else {
    console.log(`[OK] auto-libs 是最新版本`)
  }
  if (res[3] !== res[2]) {
    console.log(`[WRONG] auto-ui 包不是最新版本，当前版本为 ${res[3]}，请升级至 ${res[2]}`)
    console.log('        yarn add auto-ui')
  } else {
    console.log(`[OK] auto-ui 是最新版本`)
  }
  if (res[5] !== res[4]) {
    console.log(`[WRONG] react-scripts-auto 包不是最新版本，当前版本为 ${res[5]}，请升级至 ${res[4]}`)
    console.log('        yarn add react-scripts-auto')
  } else {
    console.log(`[OK] react-scripts-auto 是最新版本`)
  }
  if (res[7] !== res[6]) {
    console.log(`[WRONG] eslint-config-atzuche 包不是最新版本，当前版本为 ${res[7]}，请升级至 ${res[6]}`)
    console.log('        yarn add eslint-config-atzuche -D')
  } else {
    console.log(`[OK] eslint-config-atzuche 是最新版本`)
  }
  if (res[9] !== res[8]) {
    console.log(`[WRONG] vconsole-atzuche-env 包不是最新版本，当前版本为 ${res[7]}，请升级至 ${res[6]}`)
    console.log('        yarn add vconsole-atzuche-env -D')
  } else {
    console.log(`[OK] vconsole-atzuche-env 是最新版本`)
  }
  if (res[11] !== res[10]) {
    console.log(`[WRONG] vconsole-atzuche-webpack-plugin 包不是最新版本，当前版本为 ${res[7]}，请升级至 ${res[6]}`)
    console.log('        yarn add vconsole-atzuche-webpack-plugin -D')
  } else {
    console.log(`[OK] vconsole-atzuche-webpack-plugin 是最新版本`)
  }
})
