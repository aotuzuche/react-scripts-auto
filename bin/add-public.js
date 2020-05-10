// 将public下的文件移动至dist,(index.dev.html和index.prod.html除外)
// 目前只处理favicon.ico

const fs = require('fs')
const path = require('path')

// 如果没找到node_modules目录，结束
if (__dirname.indexOf('node_modules') === -1) {
  return
}

const projectPath = __dirname.split('node_modules')[0]

const envPath = path.join(projectPath, '.env')

// .env文件不存在，退出
if (!fs.existsSync(envPath)) {
  return
}

// 找到打包的出口目录
const envContent = String(fs.readFileSync(envPath))
const match = envContent.match(/BUILD_PATH=(.*)/)
let buildPath = 'build'
if (match && match[1]) {
  buildPath = match[1]
}
buildPath = path.join(projectPath, buildPath)

// 判断出口文件是否存在
if (!fs.existsSync(buildPath)) {
  return
}

// 拷贝favicon
const favicon = path.join(projectPath, 'public', 'favicon.ico')
fs.exists(favicon, function (exists) {
  if (exists) {
    fs.copyFileSync(favicon, path.join(buildPath, 'favicon.ico'))
  }
})
