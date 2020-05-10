/**
  检测依赖的版本
 */
const version = require('./utils/version')

// 如果没找到node_modules目录，结束
if (__dirname.indexOf('node_modules') === -1) {
  return
}

const consoleTips = text => {
  console.log('        ' + text)
}

// 开始检查
;(async () => {
  // 检查脚手架是否为最新版本
  const rsaRes = await version.checkVersion('react-scripts-auto')

  if (rsaRes.ok) {
    console.log(rsaRes.text)
  } else {
    console.log(rsaRes.text)
    consoleTips('需要安装最新的')
    consoleTips(rsaRes.tips)
  }

  // 检查auto-libs
  const alRes = await version.checkVersion('auto-libs')

  if (alRes.ok) {
    console.log(alRes.text)
  } else {
    console.log(alRes.text)
    consoleTips(alRes.tips)
  }

  // 检查auto-ui
  const auRes = await version.checkVersion('auto-ui')

  if (auRes.ok) {
    console.log(auRes.text)
  } else {
    console.log(auRes.text)
    consoleTips(auRes.tips)
  }

  // 检查eslint-config-atzuche
  const ecaRes = await version.checkVersion('eslint-config-atzuche')

  if (ecaRes.ok) {
    console.log(ecaRes.text)
  } else {
    console.log(ecaRes.text)
    consoleTips(ecaRes.tips)
  }

  // 检查stylelint-config-atzuche
  const scaRes = await version.checkVersion('stylelint-config-atzuche')

  if (scaRes.ok) {
    console.log(scaRes.text)
  } else {
    console.log(scaRes.text)
    consoleTips(scaRes.tips)
  }

  // 检查vconsole-atzuche-env
  const vaeRes = await version.checkVersion('vconsole-atzuche-env')

  if (vaeRes.ok) {
    console.log(vaeRes.text)
  } else {
    console.log(vaeRes.text)
    consoleTips(vaeRes.tips)
  }

  // 检查vconsole-atzuche-webpack-plugin
  const vawpRes = await version.checkVersion('vconsole-atzuche-webpack-plugin')

  if (vawpRes.ok) {
    console.log(vawpRes.text)
  } else {
    console.log(vawpRes.text)
    consoleTips(vawpRes.tips)
  }
})()
