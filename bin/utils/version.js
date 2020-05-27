const fs = require('fs')
const fetch = require('node-fetch')

// 获取某个包在npm淘宝镜像上的最新版本
const fetchRepoVersion = name => {
  return new Promise(resolve => {
    fetch(`https://registry.npm.taobao.org/${name}/latest`)
      .then(res => res.json())
      .then(json => resolve(json.version))
      .catch(() => resolve(''))
  })
}

// 获取某个包在本地的版本
const fetchLocalPackageVersion = name => {
  if (__dirname.indexOf('node_modules') === -1) {
    return '[未安装]'
  }
  const projectPath = __dirname.split('node_modules')[0]
  const file = fs.readFileSync(`${projectPath}package.json`)
  const json = JSON.parse(String(file) || '{}')

  if (json.dependencies && json.dependencies[name]) {
    return json.dependencies[name].replace('^', '')
  } else if (json.devDependencies && json.devDependencies[name]) {
    return json.devDependencies[name].replace('^', '')
  }
  return '[未安装]'
}

// 比较某个包在npm和本地的版本
const checkVersion = (name, dev) => {
  return new Promise(resolve => {
    Promise.all([ fetchRepoVersion(name), fetchLocalPackageVersion(name) ]).then(res => {
      if (res && res[0] === res[1]) {
        resolve({
          name,
          ok: true,
          version: res[0],
          text: '[OK] ' + name + ' 是最新版本, 版本号为: ' + res[0],
        })
      } else {
        resolve({
          name,
          tips: 'yarn add ' + name + (dev ? ' -D' : ''),
          ok: false,
          repo: res[0],
          local: res[1],
          text:
            '[WRONG] ' + name + ' 包不是最新版本，当前版本为 ' +
            res[1] +
            '，请升级至 ' +
            res[0],
        })
      }
    })
  })
}

module.exports = {
  fetchRepoVersion,
  fetchLocalPackageVersion,
  checkVersion,
}
