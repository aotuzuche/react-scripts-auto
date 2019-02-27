import * as history from 'history';
import demoModel from './models/demo';
import dva from 'dva';
import router from './routes/index';
import { initToken, toLogin } from 'auto-libs';
import 'auto-libs/build/styles/reset.css';
import 'auto-libs/build/scripts/flexible.js';
import 'auto-libs/build/scripts/date.js';

// fastclick
const FastClick = require('fastclick');
FastClick.attach(document.body);

const browserHistory = history.createBrowserHistory({
  basename: '/m/demo', // 注意：需要同时修改.env文件的PUBLIC_URL的
});

const app = dva({
  history: browserHistory,
  onError() {
    console.log('catch err');
  }, // 不能缺少，不然错误时会抛出异常
});

if (process.env.REACT_APP_PACKAGE === 'dev') {
  console.warn(
    '\n\n这是一段只会在dev环境打印的话，如果要做一些环境区分，请使用该方式\n注意：\nREACT_APP_PACKAGE = dev 时，代表环境为本地或测试1~5\n若只判断本地，请使用 process.env.NODE_ENV = development ，该变量在测试1~5或正式环境时 = production\n\n',
  );
  console.warn(
    '\n\n其他注意事项：\nbasename: 需要修改两处，src/index.tsx和根目录下的.env文件\n预登录: 在src/index.tsx中处理，默认需要登录\nproxy: 在package.json中增加"proxy": "https://test1-web.autozuche.com"\n\nauto-ui地址: https://aotuzuche.github.io/auto-ui/\n\n',
  );
}

app.model(demoModel);
app.router(r => router(r!.history));

// 启动页面前先登录
initToken()
  .then(() => app.start('#root'))
  .catch(() => toLogin());

// 如果不需要预登录，用这段代替上方代码
// app.start('#root');
