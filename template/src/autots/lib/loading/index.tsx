import * as React from 'react';
import Spin from '../spin';
import { createPortal, render, unmountComponentAtNode } from 'react-dom';
import './style.scss';

let div: HTMLDivElement;

function close(): void {
  if (!div) return;
  unmountComponentAtNode(div);
  if (div.parentNode) {
    div.parentNode.removeChild(div);
  }
}

function Loading(text?: string): [() => void, void] {
  // 防止多次调用先 close 检查下
  close();

  div = document.createElement('div');
  div.classList.add('x-loading', 'x-loading--show');
  document.body.appendChild(div);

  render(
    createPortal(
      <div className="x-loading__inner">
        <Spin />
        {!!text && <p>{text}</p>}
      </div>,
      div,
    ),
    div,
  );

  return [close, undefined];
}

Loading.hide = close;

export default Loading;
