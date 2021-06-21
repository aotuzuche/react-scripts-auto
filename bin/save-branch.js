const fs = require('fs')
const path = require('path')

// 如果没找到node_modules目录或不是构建test包，结束
if (__dirname.indexOf('node_modules') === -1 || process.argv[2] !== 'test') {
  return
}

// 写入分支信息到文件
const saveCurrentGitInfo = ({ name }) => {
  const htmlFilePath = path.join(projectPath, 'public', 'index.dev.html')
  const htmlFile = fs.readFileSync(htmlFilePath).toString()
  let newHtmlFile = htmlFile
  const now = new Date()
  const branchName = `${name}__${now.getFullYear()}_${now.getMonth() + 1}_${now.getDate()}_${now.getHours()}:${now.getMinutes()}`

  if (/<input.*?GIT_BRANCH.*?\/>/.test(htmlFile)) {
    newHtmlFile = htmlFile.replace(
      /<input.*?GIT_BRANCH.*?\/>/,
      `<input id="GIT_BRANCH" type="hidden" value="${branchName}" />`,
    )
  } else {
    newHtmlFile = htmlFile.replace('</body>', `<input id="GIT_BRANCH" type="hidden" value="${branchName}" /></body>`)
  }

  // 写入git branch信息
  fs.writeFileSync(htmlFilePath, newHtmlFile)
}

// 项目目录
const projectPath = __dirname.split('node_modules')[0]
const gitPath = path.join(projectPath, '.git')
const gitHEADPath = path.join(gitPath, 'HEAD')
const gitFetchHeadPath = path.join(gitPath, 'FETCH_HEAD')

// 若没有.git或.git/HEAD目录时，不查找分支
if (!fs.existsSync(gitPath) || !fs.existsSync(gitHEADPath)) {
  // 保存当前分支信息为空
  saveCurrentGitInfo({ name: '', exist: false })
} else {
  // 获取当前项目的git/HEAD与git/FECH_HEAD文件内容
  const gitHeadFile = fs.readFileSync(gitHEADPath).toString().trim()
  const gitFetchHeadFile = fs.readFileSync(gitFetchHeadPath).toString().trim()

  // .git/HEAD文件内容有两种结果，分支信息或commit id，如果以ref:开头
  // 则是直接是分支名，若不是，会是一串commit id，对应关系在.git/FETCH_HEAD中
  // 需要在.git/FETCH_HEAD进行查找分支名
  if (gitHeadFile.startsWith('ref:')) {
    // 剔除多余内容
    const name = gitHeadFile.replace(/.*?refs\/heads\//, '').trim()

    // 保存当前分支信息
    saveCurrentGitInfo({ name, exist: true })
  } else {
    // 遍历git/FECH_HEAD文件找到当前分支名
    const reg = new RegExp(`${gitHeadFile}\.*branch\\W'([^']+)'\\Wof`)
    const matchRes = gitFetchHeadFile.match(reg)
    if (matchRes && matchRes.length >= 1) {
      // 保存当前分支信息
      saveCurrentGitInfo({ name: matchRes[1], exist: true })
    } else {
      // 未找到，清理
      saveCurrentGitInfo({ name: '', exist: false })
    }
  }
}

