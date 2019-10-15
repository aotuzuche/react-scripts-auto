const fs = require('fs')
const path = require('path')

// 如果没找到node_modules目录，结束
if (__dirname.indexOf('node_modules') === -1) {
  return
}

const projectPath = __dirname.split('node_modules')[0]

let f = String(fs.readFileSync(path.join(projectPath, 'package.json')))
const jsonF = JSON.parse(f)

if (!jsonF.scripts.doctor) {
  f = f.replace(/"__build".+,/, (i) => {
    return i + '\r\t\t"doctor": "node ./node_modules/react-scripts-auto/bin/doctor.js",'
  })
  fs.writeFileSync(path.join(projectPath, 'package.json'), f)
}