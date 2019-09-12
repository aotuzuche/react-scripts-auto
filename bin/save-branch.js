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
let branch = String(br)

// .git/HEAD有两种结果，分支信息或commit id
if (branch.indexOf('ref:') === 0) {
  branch = branch.replace(/.*?refs\/heads\//, '').trim()
} else {
  const list = fs.readFileSync(path.join(projectPath, '.git', 'FETCH_HEAD')).toString()
  const reg = new RegExp(`${branch}\.*branch\\W'([^']+)'\\Wof`)
  const res = list.match(reg)
  if (res[1]) {
    branch = res[1]
  } else {
    branch = 'Unknow'
  }
}

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
