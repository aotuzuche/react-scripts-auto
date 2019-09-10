/**
  重写.env文件的PUBLIC_URL，需要根据当前打包情况指向cdn或cdn-test
 */

const fs = require('fs')

// 如果没找到node_modules目录，结束
if (__dirname.indexOf('node_modules') === -1) {
  return
}

// 是否为测试环境
const isTest = process.argv[2] === 'test'

const projectPath = __dirname.split('node_modules')[0]
const envFile = projectPath + '.env'

const file = fs.readFileSync(envFile)
let fileContent = String(file)

if (isTest) {
  fileContent = fileContent.replace('cdn.atzuche.com', 'cdn-test.atzuche.com')
} else {
  fileContent = fileContent.replace('cdn-test.atzuche.com', 'cdn.atzuche.com')
}

fs.writeFileSync(envFile, fileContent)
