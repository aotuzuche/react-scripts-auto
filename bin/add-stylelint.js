/**
  项目添加stylelint
 */

const fs = require('fs')
const path = require('path')

// 如果没找到node_modules目录，结束
if (__dirname.indexOf('node_modules') === -1) {
  return
}

const projectPath = __dirname.split('node_modules')[0]

// 把rc文件拷贝过来
const exist = fs.existsSync(path.join(projectPath, '.stylelintrc.json'))
if (!exist) {
  fs.copyFileSync(
    path.join(__dirname, '../template/.stylelintrc.json'),
    path.join(projectPath, '.stylelintrc.json'),
  )
}

// 检查package.json
const pkg = fs.readFileSync(path.join(projectPath, 'package.json'))
const packageJson = JSON.parse(String(pkg) || '{}')
const lintStaged = packageJson['lint-staged']
if (!lintStaged) {
  throw new Error('[ERROR] package.json未正确配置lint-staged')
}

if (!lintStaged['*.{scss,sass}']) {
  const newPkg = String(pkg).replace(/"lint-staged"(.*)?\:(.*)?\{/, (res) => {
    return res + '\r\n    "*.{scss,sass}": "stylelint",'
  })
  fs.writeFileSync(path.join(projectPath, 'package.json'), newPkg)
}
