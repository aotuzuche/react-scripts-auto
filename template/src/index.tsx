import createApp from 'react-scripts-auto/createApp'

if (process.env.REACT_APP_PACKAGE === 'dev') {
  console.warn(
    '\n\n这是一段只会在dev环境打印的话，如果要做一些环境区分，请使用该方式\n注意：\nREACT_APP_PACKAGE = dev 时，代表环境为本地或测试1~5\n若只判断本地，请使用 process.env.NODE_ENV = development ，该变量在测试1~5或正式环境时 = production\n\n',
  )
  console.warn(
    '\n\n其他注意事项：\nbasename: 需要修改两处，src/index.tsx和根目录下的.env文件\n预登录: 在src/index.tsx中处理，默认需要登录\nproxy: 在package.json中增加"proxy": "https://test1-web.autozuche.com"\n\nauto-ui地址: https://aotuzuche.github.io/auto-ui/\n\n',
  )
}

createApp({
  basename: '/m/demo', // 注意：需要同时修改.env文件的PUBLIC_URL的
  defaultRoute: '/',
  complete: app => app.start('#root'),
})
