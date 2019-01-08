import createBrowserHistory from 'history/createBrowserHistory';
import demoModel from './models/demo';
import dva from 'dva';
import router from './routes/index';
import './assets/style/reset.css';
import './utils/flexible';
import './utils/polyfill';

// fastclick
const FastClick = require('fastclick');
FastClick.attach(document.body);

const app = dva({ history: createBrowserHistory() });

app.model(demoModel);
app.router(r => router(r!.history));
app.start('#root');
