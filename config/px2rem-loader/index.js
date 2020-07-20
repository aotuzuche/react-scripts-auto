let loaderUtils = require('loader-utils')
let Px2rem = require('./px2rem')

module.exports = function(source, ext) {
  let options = loaderUtils.getOptions(this)
  const include = options.include || []
  const file = ext.file || ''

  // 业务代码
  if (file.indexOf('node_modules') === -1) {
    let px2remIns = new Px2rem(options)
    return px2remIns.generateRem(source)
  }

  let exist = false
  for (let i of include) {
    if (file.indexOf(i) !== -1) {
      exist = true
      break
    }
  }

  // 在include内的文件
  if (exist) {
    let px2remIns = new Px2rem(options)
    return px2remIns.generateRem(source)
  }

  // 不处理
  return source
}
