// 将public下的文件移动至dist,(*.html, asset-manifest.json除外)
const fs = require('fs')
const path = require('path')
const walk = require('./utils/walk')
const env = require('./utils/env')

// 如果没找到node_modules目录，结束
if (__dirname.indexOf('node_modules') === -1) {
  return
}

const envMap = env.map()
const projectPath = __dirname.split('node_modules')[0]

// .env文件配置不存在，退出
if (!envMap.BUILD_PATH) {
  return
}

// 找到打包的出口目录
let buildPath = envMap.BUILD_PATH
buildPath = path.join(projectPath, buildPath)

// 判断出口文件是否存在
if (!fs.existsSync(buildPath)) {
  return
}

const publicPath = path.join(projectPath, 'public')

walk(publicPath).then(files => {
  files.forEach(f => {
    if (f.endsWith('asset-manifest.json')) {
      return
    }
    if (f === 'index.prod.html' || f === 'index.dev.html') {
      return
    }
    const rf = f.replace(publicPath, '')
    try {
      fs.copyFileSync(f, path.join(buildPath, rf))
    } catch(err) {}
  })
})
