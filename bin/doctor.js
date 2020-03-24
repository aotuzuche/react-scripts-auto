const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const version = require('./version')
const shell = require('shelljs')

// 检查更新eslintrc.js
// 检查并更新bin下的所有文件
// 检查package.json
// 1. husky、lint-staged配置
// 2. auto-libs auto-ui react-scripts-auto at-js-sdk eslint-config-atzuche vconsole vconsole-atzuche-env vconsole-atzuche-webpack-plugin 最新
// 3. fastclick
// 4. husky lint-staged prettier eslint-plugin-react 安装

// 如果没找到node_modules目录，结束
if (__dirname.indexOf('node_modules') === -1) {
  return
}

const projectPath = __dirname.split('node_modules')[0]
const templatePath = path.join(__dirname, '../template')

// 检查脚手架是否为最新版本
function checkRSAVersion() {
  return new Promise((resolve, reject) => {
    Promise.all([
      version.fetchRepoVersion('react-scripts-auto'),
      version.fetchLocalPackageVersion('react-scripts-auto'),
    ]).then(res => {
        if (res[1] === res[0]) {
          console.log('[OK] react-scripts-auto 是最新版本')
          resolve()
        } else {
          console.log(`[WRONG] react-scripts-auto 包不是最新版本，当前版本为 ${res[1]}，请升级至 ${res[0]}`)
          console.log('        需要安装最新的')
          console.log('        yarn add react-scripts-auto')
          reject()
        }
    })
  })
}

// 主要依赖是否为最新
function checkImportantPackageVersion() {
  return new Promise((resolve) => {
    Promise.all([
      version.fetchRepoVersion('auto-libs'),
      version.fetchLocalPackageVersion('auto-libs'),
      version.fetchRepoVersion('auto-ui'),
      version.fetchLocalPackageVersion('auto-ui'),
      version.fetchRepoVersion('eslint-config-atzuche'),
      version.fetchLocalPackageVersion('eslint-config-atzuche'),
      version.fetchRepoVersion('vconsole-atzuche-env'),
      version.fetchLocalPackageVersion('vconsole-atzuche-env'),
      version.fetchRepoVersion('vconsole-atzuche-webpack-plugin'),
      version.fetchLocalPackageVersion('vconsole-atzuche-webpack-plugin'),
    ]).then(res => {
        if (res[1] !== res[0]) {
          console.log(`[WRONG] auto-libs 包不是最新版本，当前版本为 ${res[1]}，请升级至 ${res[0]}`)
          console.log('        yarn add auto-libs')
        } else {
          console.log(`[OK] auto-libs 是最新版本`)
        }
        if (res[3] !== res[2]) {
          console.log(`[WRONG]  auto-ui 包不是最新版本，当前版本为 ${res[3]}，请升级至 ${res[2]}`)
          console.log('         yarn add auto-ui')
        } else {
          console.log(`[OK] auto-ui 是最新版本`)
        }
        if (res[5] !== res[4]) {
          console.log(`[WRONG] eslint-config-atzuche 包不是最新版本，当前版本为 ${res[7]}，请升级至 ${res[6]}`)
          console.log('        yarn add eslint-config-atzuche -D')
        } else {
          console.log(`[OK] eslint-config-atzuche 是最新版本`)
        }
        if (res[7] !== res[6]) {
          console.log(`[WRONG] vconsole-atzuche-env 包不是最新版本，当前版本为 ${res[7]}，请升级至 ${res[6]}`)
          console.log('        yarn add vconsole-atzuche-env -D')
        } else {
          console.log(`[OK] vconsole-atzuche-env 是最新版本`)
        }
        if (res[9] !== res[8]) {
          console.log(`[WRONG] vconsole-atzuche-webpack-plugin 包不是最新版本，当前版本为 ${res[7]}，请升级至 ${res[6]}`)
          console.log('        yarn add vconsole-atzuche-webpack-plugin -D')
        } else {
          console.log(`[OK] vconsole-atzuche-webpack-plugin 是最新版本`)
        }

        resolve()
    })
  })
}

// 检查更新eslintrc.js
function checkEslint() {
  return new Promise(resolve => {
    const exists = fs.existsSync(path.join(projectPath, '.eslintrc.js'))
    if (exists) {
      const f1 = String(fs.readFileSync(path.join(projectPath, '.eslintrc.js')))
      const f2 = String(fs.readFileSync(path.join(templatePath, '.eslintrc.js')))
      if (f1 !== f2) {
        fs.copyFileSync(path.join(templatePath, '.eslintrc.js'), path.join(projectPath, '.eslintrc.js'))
        console.log('[WRONG] 不允许私自修改.eslintrc.js文件，自动复原')
      } else {
        console.log('[OK] .eslintrc.js文件正常')
      }
    } else {
      fs.copyFileSync(path.join(templatePath, '.eslintrc.js'), path.join(projectPath, '.eslintrc.js'))
      console.log('[WRONG] 缺少.eslintrc.js文件，自动创建')
    }

    resolve()
  })
}

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

// 检查package.json husky、lint-staged配置
function checkPackageJson() {
  return new Promise(resolve => {
    let f = String(fs.readFileSync(path.join(projectPath, 'package.json')))
    const jsonF = JSON.parse(f)

    if (!jsonF.scripts.doctor) {
      f = f.replace(/"__build".+,/, (i) => {
        return i + '\r\t\t"doctor": "node ./node_modules/react-scripts-auto/bin/doctor.js",'
      })
      fs.writeFileSync(path.join(projectPath, 'package.json'), f)
    }

    if (f.indexOf('fastclick') !== -1) {
      console.log('[WRONG] 请勿使用 fastclick 库，自动删除')
      shell.exec('yarn remove fastclick')
    }
    if (f.indexOf('react-loadable') !== -1) {
      console.log('[WRONG] 弃用 react-loadable 库，改用React.lazy，自动删除')
      shell.exec('yarn remove react-loadable @types/react-loadable')
      console.log('请修改路由代码: ')
      console.log('1. 引入pages改为： const PageIndex = React.lazy(() => import(\'../pages/index\'))')
      console.log('2. 在<Router history={history}>内包裹一层 <React.Suspense fallback={() => <div />}> ... </React.Suspense>')
    }
    if (f.indexOf('husky') === -1) {
      console.log('[WRONG] 缺少 husky 库，自动安装')
      shell.exec('yarn add husky -D')
      console.log('请在package.json中添加如下配置: ')
      console.log(`
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},`)
    }
    if (f.indexOf('lint-staged') === -1) {
      console.log('[WRONG] 缺少 lint-staged 库，自动安装')
      shell.exec('yarn add lint-staged -D')
      console.log('请在package.json中添加如下配置: ')
      console.log(`
"lint-staged": {
  "*.{scss,sass}": "stylelint",
  "*.{js,jsx,ts,tsx}": [
    "yarn tslint",
    "eslint --fix",
    "git add"
  ]
},`)
    }
    if (f.indexOf('prettier') === -1) {
      console.log('[WRONG] 缺少 prettier 库，自动安装')
      shell.exec('yarn add prettier -D')
    }

    if (f.indexOf('stylelint') === -1) {
      console.log('[WRONG] 缺少 stylelint 库，自动安装')
      shell.exec('yarn add stylelint -D')
    }
    if (f.indexOf('stylelint-config-atzuche') === -1) {
      console.log('[WRONG] 缺少 stylelint-config-atzuche 库，自动安装')
      shell.exec('yarn add stylelint-config-atzuche -D')
    }

    if (f.indexOf('eslint') === -1) {
      console.log('[WRONG] 缺少 eslint 库，自动安装')
      shell.exec('yarn add eslint -D')
    }
    if (f.indexOf('eslint-config-atzuche') === -1) {
      console.log('[WRONG] 缺少 eslint-config-atzuche 库，自动安装')
      shell.exec('yarn add eslint-config-atzuche -D')
    }
    if (f.indexOf('eslint-plugin-react') === -1) {
      console.log('[WRONG] 缺少 eslint-plugin-react 库，自动安装')
      shell.exec('yarn add eslint-plugin-react -D')
    }

    resolve()
  })
}

checkRSAVersion()
  .then(checkImportantPackageVersion)
  .then(checkEslint)
  .then(checkBinFiles)
  .then(checkPackageJson)
  .then(() => {
    console.log('')
    console.log('     doctor检查完毕')
    console.log('')
  })
  .catch(() => {})
