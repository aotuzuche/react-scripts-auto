import { History } from 'history'
import * as React from 'react'
import { IDemoPageState } from './model'

interface IProps {
  history: History
  dispatch: (data: any) => Promise<any>
  store: IDemoPageState
}

interface IState {
  test: string
}

export default class App extends React.PureComponent<IProps, IState> {
  state = { test: '' }

  componentDidMount() {
    // ...
  }
}
