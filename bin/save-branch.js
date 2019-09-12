const fs = require('fs')
const path = require('path')

// 如果没找到node_modules目录，结束
// 不是test，结束
if (__dirname.indexOf('node_modules') === -1 || process.argv[2] !== 'test') {
  return
}

const projectPath = __dirname.split('node_modules')[0]

// 获取当前分支信息
const br = fs.readFileSync(path.join(projectPath, '.git', 'HEAD'))
const branch = String(br)
  .replace(/.*?refs\/heads\//, '')
  .trim()

let temp = fs.readFileSync(path.join(projectPath, 'public', 'index.dev.html')).toString()

if (/<input.*?GIT_BRANCH.*?\/>/.test(temp)) {
  temp = temp.replace(
    /<input.*?GIT_BRANCH.*?\/>/,
    `<input id="GIT_BRANCH" type="hidden" value="${branch}" />`,
  )
} else {
  temp = temp.replace('</body>', `<input id="GIT_BRANCH" type="hidden" value="${branch}" /></body>`)
}

// 写入git branch信息
fs.writeFileSync(path.join(projectPath, 'public', 'index.dev.html'), temp)
