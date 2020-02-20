/**
  拷贝src/containers/auth文件
 */

const fs = require('fs')
const path = require('path')

// 如果没找到node_modules目录，结束
if (__dirname.indexOf('node_modules') === -1) {
  return
}

const projectPath = __dirname.split('node_modules')[0]

// 检查并生成containers/auth目录
const containersPath = path.join(projectPath, 'src', 'containers')
const hasContainersDir = fs.existsSync(containersPath)
if (!hasContainersDir) {
  fs.mkdirSync(containersPath)
}

const authPath = path.join(containersPath, 'auth')
const hasAuthDir = fs.existsSync(authPath)
if (!hasAuthDir) {
  fs.mkdirSync(authPath)
}

// 把文件拷贝过来
fs.exists(path.join(projectPath, 'node_modules', 'cra-template-auto'), function(exists) {
  if (exists) {
    fs.copyFileSync(
      path.join(
        projectPath,
        'node_modules',
        'cra-template-auto',
        'template',
        'src',
        'containers',
        'auth',
        'index.tsx',
      ),
      path.join(authPath, 'index.tsx'),
    )
    fs.copyFileSync(
      path.join(
        projectPath,
        'node_modules',
        'cra-template-auto',
        'template',
        'src',
        'containers',
        'auth',
        'style.scss',
      ),
      path.join(authPath, 'style.scss'),
    )
  }
})
