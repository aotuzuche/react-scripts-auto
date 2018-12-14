import * as React from 'react';
import * as S from './style';
import Controller from './controller';

export default class View extends Controller {
  public componentDidMount() {}

  public render() {
    return (
      <S.Wrapper>
        {this.renderHelloWorld()}
      </S.Wrapper>
    );
  }

  private renderHelloWorld() {
    return 'hello world';
  }
}
