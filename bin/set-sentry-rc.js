/**
 * 根据测试或正式环境生成.sentryclirc文件
 *
 * 格式为：
 * [defaults]
 * url = https://sentry.aotuzuche.com/
 * org = sentry
 * project = <project>
 * [auth]
 * token = <token>
 */

const path = require('path')
const fs = require('fs')
const env = require('./utils/env')

// 如果没找到node_modules目录，结束
if (__dirname.indexOf('node_modules') === -1) {
  return
}

// 是否为测试环境
const isTest = process.argv[2] === 'test'

const projectPath = __dirname.split('node_modules')[0]
const sentryFile = path.join(projectPath, '.sentryclirc')

// 如果文件存在，先删除
if (fs.existsSync(sentryFile)) {
  fs.unlinkSync(sentryFile)
}

// 获取.env文件中关于sentry的几个配置
const envMap = env.map()
const project = isTest ? envMap.SENTRY_PROJECT_TEST : envMap.SENTRY_PROJECT_PROD

// 没有相关配置就结掉
if (!envMap.SENTRY_TOKEN || !project) {
  if (fs.existsSync(sentryFile)) {
    fs.unlinkSync(sentryFile)
  }
  return
}

// 生成文件
let fileContent = `[defaults]
url = https://sentry.aotuzuche.com/
org = sentry
project = ${project}
[auth]
token = ${envMap.SENTRY_TOKEN}`

fs.writeFileSync(sentryFile, fileContent)
