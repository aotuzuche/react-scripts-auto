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

app.model(demoModel);
app.router(r => router(r!.history));
app.start('#root');
