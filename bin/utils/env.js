const path = require('path')
const fs = require('fs')

// todo: use dotenv and dotenv-expand

// 如果没找到node_modules目录，结束
if (__dirname.indexOf('node_modules') === -1) {
  return
}

const projectPath = __dirname.split('node_modules')[0]
const envFile = path.join(projectPath, '.env')

// 获取.env文件中的map
function map() {
  if (!fs.existsSync(envFile)) {
    return {}
  }
  const env = {}
  String(fs.readFileSync(envFile))
    .split('\n')
    .map(i => i.trim())
    .filter(i => i.indexOf('#') !== 0 && i.indexOf('=') > 0)
    .forEach(i => {
      const j = i.split('=')
      env[j[0]] = j[1]
    })
  return env
}

// 设置.env的某个值
function set(key, value) {
  if (!fs.existsSync(envFile)) {
    return
  }
  const env = String(fs.readFileSync(envFile))
    .split('\n')
    .map(i => i.trim())
    .map(i => {
      if (i.indexOf(key + '=') === 0) {
        return key + '=' + value
      }
      return i
    })
    .join('\n')
  fs.writeFileSync(envFile, env)
}

module.exports = {
  map,
  set,
}
