const OSS = require('ali-oss')
const env = require('./utils/env')
const path = require('path')
const walk = require('./utils/walk')

// 如果没找到node_modules目录，结束
if (__dirname.indexOf('node_modules') === -1) {
  return
}

// 是否为测试环境
const isTest = process.argv[2] === 'test'

const reginTest = 'auto-static-test'
const reginPro = 'auto-static-pro'
const endpoint = 'http://oss-cn-hangzhou.aliyuncs.com'

// 获取.env文件中的PUBLIC_URL
const envMap = env.map()
const publicUrl = envMap.PUBLIC_URL
const projectPath = __dirname.split('node_modules')[0]

if (!publicUrl || !envMap.BUILD_PATH || publicUrl.indexOf('http') !== 0) {
  return
}

const access_key_id = envMap.ACCESS_KEY_ID
const access_key_secret = envMap.ACCESS_KEY_SECRET

if (!access_key_id || !access_key_secret) {
  console.log(
    '注意：没有设置access_key_id或access_key_secret，无法将资源上传至OSS，请在.env文件中设置',
  )
}

if (publicUrl.split('atzuche.com/').length !== 2) {
  return
}

let prefix = publicUrl.split('atzuche.com/')[1]
if (prefix === '') {
  return
}

const client = new OSS({
  region: isTest ? reginTest : reginPro,
  accessKeyId: access_key_id,
  accessKeySecret: access_key_secret,
  endpoint: endpoint,
  bucket: isTest ? reginTest : reginPro,
})

let successCount = 0
let failCount = 0
let totalCount = 0

// 上传结果
const ossPutResult = (res, name) => {
  if (res && res.res && res.res.status === 200) {
    successCount++
    console.log('[OSS] SUCCESS upload to ' + (isTest ? reginTest : reginPro) + ': ' + name)
  } else {
    failCount++
    console.log('[OSS] FAIL upload to ' + (isTest ? reginTest : reginPro) + ': ' + name)
  }
  // 上传完成
  if (totalCount === successCount + failCount) {
    console.log('[OSS] 上传成功: ' + successCount + '个资源，失败: ' + failCount + '个资源')
  }
}

const ossPutError = name => {
  failCount++
  console.log('[OSS] FAIL upload to ' + (isTest ? reginTest : reginPro) + ': ' + name)
}

const buildPath = path.join(projectPath, envMap.BUILD_PATH)
walk(buildPath).then(files => {
  for (let f of files) {
    if (f.endsWith('index.html')) {
      continue
    }
    const name = prefix + f.replace(buildPath, '')
    totalCount++
    client
      .put(name, f)
      .then(res => ossPutResult(res, name))
      .catch(() => ossPutError(name))
  }
})
