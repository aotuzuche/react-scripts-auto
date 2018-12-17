import createBrowserHistory from 'history/createBrowserHistory';
import demoModel from 'src/models/demo';
import dva from 'dva';
import router from 'src/routes/index';
import 'src/assets/style/reset.css';

const app = dva({ history: createBrowserHistory() });

app.model(demoModel);
app.router(r => router(r!.history));
app.start('#root');
