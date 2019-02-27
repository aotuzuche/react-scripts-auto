import * as history from 'history';
import demoModel from './models/demo';
import dva from 'dva';
import router from './routes/index';
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
  console.log('这是一段只会在dev环境打印的话，如果要做一些环境区分，请使用该方式');
}

app.model(demoModel);
app.router(r => router(r!.history));
app.start('#root');
