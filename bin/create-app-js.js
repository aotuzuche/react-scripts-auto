// 创建初始化页面的js

const fs = require('fs')
const path = require('path')
const walk = require('./utils/walk')
const routeSort = require('./utils/routeSort')

// 如果没找到node_modules目录，结束
if (__dirname.indexOf('node_modules') === -1) {
  return
}

const projectPath = __dirname.split('node_modules')[0]
const caPath = path.join(__dirname, '..', 'createApp.js')

// 如果文件存在，先删除
if (fs.existsSync(caPath)) {
  fs.unlinkSync(caPath)
}

// 默认需要导入的内容
const defaultImport = `
import { Redirect, Route, Router, Switch } from 'dva/router'
import * as React from 'react'
import * as history from 'history'
import 'auto-libs/build/scripts/flexible.js'
import 'auto-libs/build/styles/reset.css'
import dva from 'dva'
import atb from 'at-js-bridge'
import { setToken, clearToken, Search, getMiniProgramEnv, Reg } from 'auto-libs'
`

// 导入model
const createImportModel = data => {
  const models = {}
  Object.keys(data).forEach(key => {
    if (data[key].model) {
      let model = data[key].model.replace(pagePath, '')
      model = model.replace(/\\+/g, '/')
      models[data[key].name] = model
    }
  })

  let importStr = ''
  Object.keys(models).forEach(key => {
    importStr += `import ${key}Model from '../../src/pages${models[key]}'\n`
  })

  return importStr + '\n'
}

// 导入页面
const createImportPage = data => {
  const pages = {}
  Object.keys(data).forEach(key => {
    if (data[key].index) {
      let index = data[key].index.replace(pagePath, '')
      index = index.replace(/\\+/g, '/')
      pages[data[key].name] = index
    }
  })

  let importStr = ''
  Object.keys(pages).forEach(key => {
    importStr += `const Page${key} = React.lazy(() => import('../../src/pages${pages[key]}'))\n`
  })

  return importStr + '\n'
}

// 创建router
const createRouter = (data, sort) => {
  const dataList = []
  sort.forEach(k => {
    dataList.push(data[k])
  })

  let str = ''
  for (let s of sort) {
    str += `
        React.createElement(Route, {
          exact: true,
          path: '${s}',
          component: Page${data[s].name},
        }),`
  }

  return `const router = (history, defaultRoute) => {

  const MyRedirect = props => {
    if (window.Raven && props && props.location && props.location.pathname) {
      const path = props.location.pathname + props.location.search
      window.Raven.captureException('路由redirect, 源路由: ' + path + ', 跳转至: ' + props.to, {
        level: 'warning',
      })
    }
    return React.createElement(Redirect, props)
  }

  return React.createElement(
    Router,
    { history: history },
    React.createElement(
      React.Suspense,
      {
        fallback: function fallback() {
          return React.createElement('div', null)
        },
      },
      React.createElement(
        Switch,
        null,${str}
        React.createElement(MyRedirect, {
          from: '*',
          to: defaultRoute || '/',
        }),
      ),
    ),
  )
}
`
}

// 创建上报pv/uv的方法
const createPVUV = sort => {

  return `// 全部路由
window._all_routers_ =  ${sort.length > 0 ? `['${sort.join('\', \'')}']` : '[]'}.reverse()

// 计算路由匹配度
const findRouter = name => {
  if (!window._all_routers_ || !window._basename_) {
    return
  }
  const routers = window._all_routers_.map(r => window._basename_ + r.replace(/\:[a-zA-Z]+/g, '.*'))
  for (let i = 0; i < routers.length; i++) {
    if (routers[i] === name || new RegExp(routers[i]).test(name)) {
      return window._all_routers_[i]
    }
  }
  return ''
}

// url切换时的统计
const urlChangeAnalytics = () => {
  if (!window._basename_ || !window.fetch) {
    return
  }
  const key = '__atec_url__'
  let uuid = localStorage.getItem('_app_uuid_')
  if (!uuid) {
    uuid = String(new Date().valueOf()) + Math.round(Math.random() * 9999)
    localStorage.setItem('_app_uuid_', uuid)
  }
  const surl = window[key]
  const url = encodeURIComponent(window.location.origin + window.location.pathname)
  if (surl !== url) {
    window[key] = url
    const data = {
      uu: uuid,
      u: url,
      r: findRouter(window.location.pathname),
      g: window._basename_,
    }
    window.fetch('/apigateway/webAnalytics/public/page/m', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => {})
  }
}

setInterval(urlChangeAnalytics, 1000)
`
}

// 创建返回方法
const createExportFunc = data => {
  const models = []
  Object.keys(data).forEach(key => {
    if (data[key].model) {
      const n = `${data[key].name}Model`
      if (models.indexOf(n) === -1) {
        models.push(n)
      }
    }
  })

  let modelStr = ''
  for (let m of models) {
    modelStr += `app.model(${m})\n  `
  }

  return `
window.addEventListener('resize', e => {
  if (
    document.activeElement.tagName === 'INPUT' ||
    document.activeElement.tagName === 'TEXTAREA'
  ) {
    window.setTimeout(() => {
      if (document && document.activeElement && document.activeElement.scrollIntoViewIfNeeded) {
        document.activeElement.scrollIntoViewIfNeeded()
      }
    }, 10)
  }
})

document.body.addEventListener('click', e => {
  if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
    const focus = document.querySelector('input:focus')
    focus && focus.blur()
  }
})

window.addEventListener('focusout', () => {
  window.scrollTo(0, 0)
})

// 是否为小程序，默认值为false
window.isMiniProgram = false

const createApp = opts => {
  if (!opts) {
    throw new Error('配置不能为空')
  }

  if (!opts.basename) {
    throw new Error('basename不能为空')
  }

  const browserHistory = history.createBrowserHistory({
    basename: opts.basename,
  })

  window._basename_ = opts.basename

  urlChangeAnalytics && urlChangeAnalytics()

  const app = dva({
    history: browserHistory,
    onError() {}, // 不能缺少，不然错误时会抛出异常
  })

  ${modelStr}
  app.router(r => router(r.history, opts.defaultRoute))

  if (opts.complete) {
    if (Reg.isApp) {
      atb.user.getToken().then(token => {
        if (token) {
          setToken(token)
        } else {
          clearToken(token)
        }
        if (Reg.isiOS) {
          window.platform = 'IOS'
        } else {
          window.platform = 'ANDROID'
        }
        opts.complete(app)
      })
    } else {
      if (Search.exist('atMiniProgram')) {
        const token = Search.getDefault('token', '');
        if (token) {
          setToken(token)
        } else {
          clearToken(token)
        }
        window.sessionStorage.setItem('__atMiniProgram__', 'True')
        window.sessionStorage.setItem('__atMiniProgramET__', Search.getDefault('atMiniProgramET', ''))
      }
      getMiniProgramEnv().then(res => {
        window.isMiniProgram = res.isMiniProgram

        if (res.isMiniProgram) {
          if (Reg.isAlipay) {
            window.platform = 'MINIPROGRAM-ALIPAY'
          } else if (Reg.isWX) {
            window.platform = 'MINIPROGRAM-WECHAT'
          } else if (Reg.isJD) {
            window.platform = 'MINIPROGRAM-JD'
          }
        } else {
          if (Reg.isAlipay) {
            window.platform = 'ALIPAY'
          } else if (Reg.isWXWork) {
            window.platform = 'WECHAT-WORK'
          } else if (Reg.isWX) {
            window.platform = 'WECHAT'
          } else if (Reg.isJD) {
            window.platform = 'JD'
          } else {
            window.platform = 'WEB'
          }
        }

        opts.complete(app)
      })
    }
  }
}

export default createApp
`
}

// 得到所有.page文件里的path属性
const getPagePathSync = dir => {
  if (!fs.existsSync(dir)) {
    return []
  }
  const list = []
  String(fs.readFileSync(dir))
    .split('\n')
    .map(i => i.trim())
    .filter(i => !!i)
    .forEach(i => {
      if (i.indexOf('path=') === 0) {
        const path = i.replace(/^path=/, '')
        if (path && path.indexOf('/') === 0) {
          list.push(path)
        }
      }
    })

  return list
}

const pagePath = path.join(projectPath, 'src', 'pages')
if (!fs.existsSync(pagePath)) {
  return
}

// 遍历pages目录下的所有文件
walk(pagePath).then(files => {
  const pages = {}

  files.forEach(f => {
    // 过滤不是.page结尾的文件
    if (!/\.page$/.test(f)) {
      return
    }

    // 找到.page文件后，还要确保该文件有path属性和相应的index.ts或index.tsx文件
    const paths = getPagePathSync(f)
    if (!paths.length) {
      return
    }

    let index = ''
    let model = ''
    const name = path.join(f, '..').replace(pagePath, '').replace(/(\/|\\)/g, '_')

    // 找到页面入口(必须要有)
    const indexTs = path.join(f, '..', 'index.ts')
    const indexTsx = path.join(f, '..', 'index.tsx')

    if (files.indexOf(indexTs) !== -1) {
      index = indexTs
    } else if (files.indexOf(indexTsx) !== -1) {
      index = indexTsx
    } else {
      return
    }

    // 找到model(可以没有)
    const modelTs = path.join(f, '..', 'model.ts')
    const modelTsx = path.join(f, '..', 'model.tsx')

    if (files.indexOf(modelTs) !== -1) {
      model = modelTs
    } else if (files.indexOf(modelTsx) !== -1) {
      model = modelTsx
    }

    paths.forEach(path => {
      pages[path] = { index, model, name }
    })
  })

  // 对路由进行排序，防止泛匹配的路由覆盖掉具体的路由
  const routes = routeSort(Object.keys(pages))

  // 拼装内容并写入文件
  let jsContent = defaultImport
  jsContent += createImportModel(pages)
  jsContent += createImportPage(pages)
  jsContent += createRouter(pages, routes)
  jsContent += createPVUV(routes)
  jsContent += createExportFunc(pages)
  fs.writeFileSync(caPath, jsContent)
})
