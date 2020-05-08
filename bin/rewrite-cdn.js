/**
  重写.env文件的PUBLIC_URL，需要根据当前打包情况指向cdn或cdn-test
 */
const env = require('./utils/env')

// 如果没找到node_modules目录，结束
if (__dirname.indexOf('node_modules') === -1) {
  return
}

// 是否为测试环境
const isTest = process.argv[2] === 'test'

// 获取.env文件中的PUBLIC_URL
const envMap = env.map()
let publicUrl = envMap.PUBLIC_URL

if (!publicUrl) {
  return
}

if (isTest && publicUrl.indexOf('cdn.atzuche.com') !== -1) {
  publicUrl = publicUrl.replace('cdn.atzuche.com', 'cdn-test.atzuche.com')
} else if (!isTest && publicUrl.indexOf('cdn-test.atzuche.com') !== -1) {
  publicUrl = publicUrl.replace('cdn-test.atzuche.com', 'cdn.atzuche.com')
}

env.set('PUBLIC_URL', publicUrl)
