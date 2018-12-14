import * as React from 'react';
import Loadable from 'react-loadable';
import { Redirect, Route, Router, Switch } from 'dva/router';

const Loading: React.FC<any> = () => <div />;

const PageIndex = Loadable({
  loader: () => import('../pages/index'),
  loading: Loading,
});

export default (history: any) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact={true} path="/" component={PageIndex} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
};
