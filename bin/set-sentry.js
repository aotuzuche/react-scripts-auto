/**
 * 根据测试或正式环境生成.sentryclirc文件
 *
 * 格式为：
 * [defaults]
 * url = http://47.96.104.13:9000/
 * org = sentry
 * project = <project>
 * [auth]
 * token = <token>
 */

const path = require('path')
const fs = require('fs')

// 如果没找到node_modules目录，结束
if (__dirname.indexOf('node_modules') === -1) {
  return
}

// 是否为测试环境
const isTest = process.argv[2] === 'test'

const projectPath = __dirname.split('node_modules')[0]
const envFile = path.join(projectPath, '.env')
const sentryFile = path.join(projectPath, '.sentryclirc')

// 如果文件存在，先删除
if (fs.existsSync(sentryFile)) {
  fs.unlinkSync(sentryFile)
}

// 获取.env文件中关于sentry的几个配置
const env = {}
String(fs.readFileSync(envFile))
  .split('\n')
  .map(i => i.trim())
  .filter(i => i.indexOf('#') !== 0 && i.indexOf('=') > 0)
  .forEach(i => {
    const j = i.split('=')
    env[j[0]] = j[1]
  })

// 没有相关配置就结掉
if (!env.SENTRY_TOKEN) {
  return
}

// 生成文件
let fileContent = `[defaults]
url = http://47.96.104.13:9000/
org = sentry
project = ${isTest ? env.SENTRY_PROJECT_TEST : env.SENTRY_PROJECT_PROD || 'm_h5_test'}
[auth]
token = ${env.SENTRY_TOKEN}`

fs.writeFileSync(sentryFile, fileContent)
