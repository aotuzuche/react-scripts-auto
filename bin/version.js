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

function fetchLocalPackageVersion(name) {
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

module.exports = {
  fetchRepoVersion,
  fetchLocalPackageVersion
}