import * as React from 'react'

interface IProps {
  test: string
}

interface IState {
  test: string
}

export default class App extends React.Component<IProps, IState> {
  public componentDidMount() {
    // ...
  }
}
