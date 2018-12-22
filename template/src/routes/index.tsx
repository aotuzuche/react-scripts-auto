import * as React from 'react';
import Loadable from 'react-loadable';
import { Redirect, Route, Router, Switch } from 'dva/router';

const Load = (loader: any) => {
  return Loadable({
    loader: () => loader,
    loading: () => <div />,
  });
};

const PageIndex = Load(import('../pages/index'));

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
