/**
  检测依赖的版本
 */
const fs = require('fs')
const fetch = require('node-fetch')

function fetchRepoVersion(name) {
  return new Promise((resolve) => {
    fetch(`https://registry.npm.taobao.org/${name}/latest`)
      .then((res) => res.json())
      .then((json) => resolve(json.version))
      .catch(() => resolve(''))
  })
}

let packageCache

function fetchLocalPackageVersion(name) {
  if (__dirname.indexOf('node_modules') === -1) {
    return '[未安装]'
  }
  let json
  if (packageCache) {
    json = packageCache
  } else {
    const projectPath = __dirname.split('node_modules')[0]
    const file = fs.readFileSync(`${projectPath}package.json`)
    json = JSON.parse(String(file) || '{}')
  }

  if (json.dependencies && json.dependencies[name]) {
    return json.dependencies[name].replace('^', '')
  } else if (json.devDependencies && json.devDependencies[name]) {
    return json.devDependencies[name].replace('^', '')
  }
  return '[未安装]'
}

Promise.all([
  fetchRepoVersion('auto-libs'),
  fetchLocalPackageVersion('auto-libs'),
  fetchRepoVersion('auto-ui'),
  fetchLocalPackageVersion('auto-ui'),
  fetchRepoVersion('react-scripts-auto'),
  fetchLocalPackageVersion('react-scripts-auto'),
  fetchRepoVersion('eslint-config-atzuche'),
  fetchLocalPackageVersion('eslint-config-atzuche'),
]).then((res) => {
  if (res[1] !== res[0]) {
    console.log('')
    console.log(`    auto-libs 包不是最新版本，当前版本为 ${res[1]}，请升级至 ${res[0]}`)
    console.log('    yarn add auto-libs')
    console.log('')
  } else {
    console.log(`[OK] auto-libs 是最新版本`)
  }
  if (res[3] !== res[2]) {
    console.log('')
    console.log(`    auto-ui 包不是最新版本，当前版本为 ${res[3]}，请升级至 ${res[2]}`)
    console.log('    yarn add auto-ui')
    console.log('')
  } else {
    console.log(`[OK] auto-ui 是最新版本`)
  }
  if (res[5] !== res[4]) {
    console.log('')
    console.log(`    react-scripts-auto 包不是最新版本，当前版本为 ${res[5]}，请升级至 ${res[4]}`)
    console.log('    yarn add react-scripts-auto')
    console.log('')
  } else {
    console.log(`[OK] react-scripts-auto 是最新版本`)
  }
  if (res[7] !== res[6]) {
    console.log('')
    console.log(`    eslint-config-atzuche 包不是最新版本，当前版本为 ${res[7]}，请升级至 ${res[6]}`)
    console.log('    yarn add eslint-config-atzuche -D')
    console.log('')
  } else {
    console.log(`[OK] eslint-config-atzuche 是最新版本`)
  }
})
