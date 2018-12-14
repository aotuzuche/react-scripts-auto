import * as React from 'react';
import * as S from './style';
import Cell from 'src/autots/lib/cell';
import Controller from './controller';

export default class View extends Controller {
  public componentDidMount() {}

  public render() {
    return (
      <S.Wrapper>
        <Cell>
          <Cell.Row>xxx</Cell.Row>
        </Cell>
      </S.Wrapper>
    );
  }
}
