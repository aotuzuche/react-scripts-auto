const https = require('https')
const path = require('path')
const fs = require('fs')

// 如果没找到node_modules目录，结束
if (__dirname.indexOf('node_modules') === -1) {
  return
}

const getSlotContent = (name) => {
  return new Promise((resolve, reject) => {
    const url = 'https://m.atzuche.com/m/__slot/' + name + '.html'
    const req = https.get(url, (res) => {
      let resData = ''
      res.on('data', (data) => {
        resData += data
      })
      res.on('end', () => {
        req.end()
        resolve(resData)
      })
    })
    req.on('error', (err) => {
      req.end()
      reject(err)
    })
  })
}

const replaceSolt = (htmlname, where, content) => {
  return new Promise((resolve) => {
    const projectPath = __dirname.split('node_modules')[0]
    const data = fs.readFileSync(path.join(projectPath, 'public', htmlname)).toString()
    const f = new RegExp(
      '<!--\\s*' + where + '\\s*-->(\\d|\\D)*<!--\\s*END' + where + '\\s*-->',
      'gi',
    )
    const ndata = data.replace(f, '<!--' + where + '-->\r' + content + '\r<!--END' + where + '-->')
    fs.writeFileSync(path.join(projectPath, 'public', htmlname), ndata)
    resolve()
  })
}

const setSlogContent = (where, isTest) => {
  return new Promise((resolve) => {
    getSlotContent(`${isTest ? 'dev' : 'prod'}.${where}`)
      .then((res) => {
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
