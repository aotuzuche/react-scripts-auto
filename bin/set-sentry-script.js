/**
 * 根据测试或正式环境在html文件尾部追加sentry的脚本
 */
const path = require('path')
const fs = require('fs')
const env = require('./utils/env')

// 如果没找到node_modules目录，结束
if (__dirname.indexOf('node_modules') === -1) {
  return
}

// 获取.env文件中关于sentry的几个配置
const envMap = env.map()

// 没有相关配置就结掉
if (!envMap.SENTRY_TOKEN) {
  return
}

// 是否为测试环境
const isTest = process.argv[2] === 'test'

// 找到生成的html文件
const htmlFile = path.join(envMap.build || 'build', 'index.html')

// 没找到html文件，结束
if (!fs.existsSync(htmlFile)) {
  return
}

// 替换html代码
let htmlContent = String(fs.readFileSync(htmlFile))
if (htmlContent.indexOf('Raven.config') === -1) {
  let script = ''
  if (isTest) {
    script =
      '<script src="https://cdn.atzuche.com/static/js/raven.3.26.2.min.js" crossorigin="anonymous"></script><script type="text/javascript">if(window.Raven){const list=window.location.pathname.split(\'/\').filter(d=>!!d);if(!list.length){list.push(\'m\',\'index\')};window.Raven.config(\'https://a4ab59de688c48edad52aa33f9bd1de8@sentry.aotuzuche.com/16\',{release:\'_\'+list[0]+\'_\'+list[1]}).install()}</script>'
  } else {
    script =
      '<script src="https://cdn.atzuche.com/static/js/raven.3.26.2.min.js" crossorigin="anonymous"></script><script type="text/javascript">if(window.Raven){const list=window.location.pathname.split(\'/\').filter(d=>!!d);if(!list.length){list.push(\'m\',\'index\')};window.Raven.config(\'https://a0d6adedaf3545d8833c1aa086f470ef@sentry.aotuzuche.com/22\',{release:\'_\'+list[0]+\'_\'+list[1]}).install()}</script>'
  }

  htmlContent = htmlContent.replace('</head>', script + '</head>')

  const onError = '<script type="text/javascript">window.onerror=function(m,s,l,c,error){if(window.Raven){window.Raven.captureException(error);};}</script>'

  htmlContent = htmlContent.replace('</body>', onError + '</body>')

  fs.writeFileSync(htmlFile, htmlContent)
}
