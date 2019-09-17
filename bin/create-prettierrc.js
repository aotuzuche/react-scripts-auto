/**
  拷贝prettierrc文件，兼容老项目没有该文件的问题
 */

const fs = require('fs')
const path = require('path')

// 如果没找到node_modules目录，结束
if (__dirname.indexOf('node_modules') === -1) {
  return
}

const projectPath = __dirname.split('node_modules')[0]

// 把rc文件拷贝过来
fs.copyFileSync(
  path.join(__dirname, '../template/.prettierrc'),
  path.join(projectPath, '.prettierrc'),
)
