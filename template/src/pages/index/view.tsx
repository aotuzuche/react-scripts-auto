import * as React from 'react';
import Cell from 'src/autots/lib/cell';
import Controller from './controller';
import './style';

export default class View extends Controller {
  public componentDidMount() {}

  public render() {
    return (
      <div className="page-index">
        <Cell>
          <Cell.Row>xxx</Cell.Row>
        </Cell>
      </div>
    );
  }
}
