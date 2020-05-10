const fs = require('fs')
const path = require('path')
const version = require('./utils/version')
const shell = require('shelljs')
const check = require('./utils/check')

// 检查更新eslintrc.js
// 检查并更新bin下的所有文件
// 检查各种不允许修改的文件
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
const consoleTips = text => {
  console.log('        ' + text)
}

// 检查package.json husky、lint-staged配置
function checkPackageJson() {
  return new Promise(resolve => {
    let f = String(fs.readFileSync(path.join(projectPath, 'package.json')))

    if (f.indexOf('fastclick') !== -1) {
      console.log('[WRONG] 请勿使用 fastclick 库，自动删除')
      shell.exec('yarn remove fastclick')
    }
    if (f.indexOf('react-loadable') !== -1) {
      console.log('[WRONG] 弃用 react-loadable 库，改用React.lazy，自动删除')
      shell.exec('yarn remove react-loadable @types/react-loadable')
      console.log('请修改路由代码: ')
      console.log('1. 引入pages改为： const PageIndex = React.lazy(() => import(\'../pages/index\'))')
      console.log(
        '2. 在<Router history={history}>内包裹一层 <React.Suspense fallback={() => <div />}> ... </React.Suspense>',
      )
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

    if (f.indexOf('eslint') === -1) {
      console.log('[WRONG] 缺少 eslint 库，自动安装')
      shell.exec('yarn add eslint -D')
    }

    if (f.indexOf('eslint-plugin-react') === -1) {
      console.log('[WRONG] 缺少 eslint-plugin-react 库，自动安装')
      shell.exec('yarn add eslint-plugin-react -D')
    }

    resolve()
  })
}

// 开始检查
;(async () => {
  // 检查脚手架是否为最新版本
  const rsaRes = await version.checkVersion('react-scripts-auto')

  if (rsaRes.ok) {
    console.log(rsaRes.text)
  } else {
    console.log(rsaRes.text)
    consoleTips('需要安装最新的')
    consoleTips(rsaRes.tips)
  }

  // 检查auto-libs
  const alRes = await version.checkVersion('auto-libs')

  if (alRes.ok) {
    console.log(alRes.text)
  } else {
    console.log(alRes.text)
    consoleTips(alRes.tips)
  }

  // 检查auto-ui
  const auRes = await version.checkVersion('auto-ui')

  if (auRes.ok) {
    console.log(auRes.text)
  } else {
    console.log(auRes.text)
    consoleTips(auRes.tips)
  }

  // 检查eslint-config-atzuche
  const ecaRes = await version.checkVersion('eslint-config-atzuche')

  if (ecaRes.ok) {
    console.log(ecaRes.text)
  } else {
    console.log(ecaRes.text)
    consoleTips(ecaRes.tips)
  }

  // 检查stylelint-config-atzuche
  const scaRes = await version.checkVersion('stylelint-config-atzuche')

  if (scaRes.ok) {
    console.log(scaRes.text)
  } else {
    console.log(scaRes.text)
    consoleTips(scaRes.tips)
  }

  // 检查vconsole-atzuche-env
  const vaeRes = await version.checkVersion('vconsole-atzuche-env')

  if (vaeRes.ok) {
    console.log(vaeRes.text)
  } else {
    console.log(vaeRes.text)
    consoleTips(vaeRes.tips)
  }

  // 检查vconsole-atzuche-webpack-plugin
  const vawpRes = await version.checkVersion('vconsole-atzuche-webpack-plugin')

  if (vawpRes.ok) {
    console.log(vawpRes.text)
  } else {
    console.log(vawpRes.text)
    consoleTips(vawpRes.tips)
  }

  // 修复bin目录下的文件
  await check.checkBinFiles()

  // 复原eslint文件
  await check.checkEslint()

  // 复原stylelint文件
  await check.checkStylelint()

  // 复原.prettierrc文件
  await check.checkPrettierrc()

  // 复原tsconfig.json文件
  await check.checkTsconfig()

  // 复原.babelrc文件
  await check.checkBabelrc()

  // 检查package.json
  await checkPackageJson()

  console.log('')
  console.log('     doctor检查完毕')
  console.log('')
})()
