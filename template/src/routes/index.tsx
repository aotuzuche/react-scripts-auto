import { Redirect, Route, Router, Switch } from 'dva/router'
import * as React from 'react'

const PageIndex = React.lazy(() => import('../pages/index'))

export default (history: any) => {
  return (
    <Router history={history}>
      <React.Suspense fallback={() => <div />}>
        <Switch>
          <Route exact={true} path="/" component={PageIndex} />
          <Redirect from="*" to="/" />
        </Switch>
      </React.Suspense>
    </Router>
  )
}
