const fs = require('fs')
const path = require('path')

// 如果没找到node_modules目录，结束
if (__dirname.indexOf('node_modules') === -1) {
  return
}

const projectPath = __dirname.split('node_modules')[0]
const templatePath = path.join(__dirname, '..', '..', 'template')

// 检查并更新bin下的所有文件
function checkBinFiles() {
  return new Promise(resolve => {
    fs.copyFileSync(
      path.join(templatePath, 'bin', 'dev.sh'),
      path.join(projectPath, 'bin', 'dev.sh'),
    )
    fs.copyFileSync(
      path.join(templatePath, 'bin', 'prod.sh'),
      path.join(projectPath, 'bin', 'prod.sh'),
    )
    fs.copyFileSync(
      path.join(templatePath, 'bin', 'test.sh'),
      path.join(projectPath, 'bin', 'test.sh'),
    )

    resolve()
  })
}

// 提示并更新文件，用于根目录下的配置文件
const updateFile = file => {
  return new Promise(resolve => {
    const exists = fs.existsSync(path.join(projectPath, file))
    if (exists) {
      const f1 = String(fs.readFileSync(path.join(projectPath, file)))
      const f2 = String(fs.readFileSync(path.join(templatePath, file)))
      if (f1 !== f2) {
        fs.copyFileSync(path.join(templatePath, file), path.join(projectPath, file))
        console.log('[WRONG] 不允许私自修改' + file + '文件，自动复原')
      } else {
        console.log('[OK] ' + file + '文件正常')
      }
    } else {
      fs.copyFileSync(path.join(templatePath, file), path.join(projectPath, file))
      console.log('[WRONG] 缺少' + file + '文件，自动创建')
    }
    resolve()
  })
}

// 检查更新eslintrc.js
const checkEslint = () => updateFile('.eslintrc.js')

// 检查更新.stylelintrc.json
const checkStylelint = () => updateFile('.stylelintrc.json')

// 检查更新.stylelintrc
const checkPrettierrc = () => updateFile('.prettierrc')

// 检查更新tsconfig.json
const checkTsconfig = () => updateFile('tsconfig.json')

// 检查更新.babelrc
const checkBabelrc = () => updateFile('.babelrc')

module.exports = {
  checkBinFiles,
  checkEslint,
  checkStylelint,
  checkPrettierrc,
  checkTsconfig,
  checkBabelrc,
}
