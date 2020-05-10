/**
  从远程目录获取html头部和底部的公共代码插入标识位置
  title、keywords和description可以在项目根目录配置.tkdignore文件进行忽略
  在.tkdignore文件里写入title、keywords或description，用换行分隔即表示忽略相关html代码
 */

const https = require('https')
const path = require('path')
const fs = require('fs')

// 如果没找到node_modules目录，结束
if (__dirname.indexOf('node_modules') === -1) {
  return
}

const projectPath = __dirname.split('node_modules')[0]
const tkdFile = path.join(projectPath, '.tkdignore')

let file = ''
try {
  file = fs.readFileSync(tkdFile)
} catch (err) {}
const fileContent = String(file)
const tkdList = fileContent.split('\n').map(i => i.trim())

const getSlotContent = name => {
  return new Promise((resolve, reject) => {
    const url = 'https://m.atzuche.com/m/__slot/' + name + '.html'
    const req = https.get(url, res => {
      let resData = ''
      res.on('data', data => {
        resData += data
      })
      res.on('end', () => {
        req.end()
        resolve(resData)
      })
    })
    req.on('error', err => {
      req.end()
      reject(err)
    })
  })
}

const replaceSolt = (htmlname, where, content) => {
  let ctt = content
  if (where === 'HEADSLOT') {
    if (tkdList.indexOf('title') !== -1) {
      ctt = ctt.replace(/<title>.*?<\/title>/, '')
    }
    if (tkdList.indexOf('keywords') !== -1) {
      ctt = ctt.replace(/<meta\s*?name="keywords"(\s|.)*?>/, '')
    }
    if (tkdList.indexOf('description') !== -1) {
      ctt = ctt.replace(/<meta\s*?name="description"(\s|.)*?>/, '')
    }
  }
  return new Promise(resolve => {
    const projectPath = __dirname.split('node_modules')[0]
    const data = fs.readFileSync(path.join(projectPath, 'public', htmlname)).toString()
    const f = new RegExp(
      '<!--\\s*' + where + '\\s*-->(\\d|\\D)*<!--\\s*END' + where + '\\s*-->',
      'gi',
    )
    const ndata = data.replace(f, '<!--' + where + '-->\r' + ctt + '\r<!--END' + where + '-->')
    fs.writeFileSync(path.join(projectPath, 'public', htmlname), ndata)
    resolve()
  })
}

const setSlogContent = (where, isTest) => {
  return new Promise(resolve => {
    getSlotContent(`${isTest ? 'dev' : 'prod'}.${where}`)
      .then(res => {
        replaceSolt(
          `index.${isTest ? 'dev' : 'prod'}.html`,
          where === 'head' ? 'HEADSLOT' : 'BODYSLOT',
          res,
        )
          .then(resolve)
          .catch(resolve)
      })
      .catch(resolve)
  })
}

// 是否为测试环境
const isTest = process.argv[2] === 'test'

setSlogContent('head', isTest).then(() => {
  setSlogContent('body', isTest)
})
