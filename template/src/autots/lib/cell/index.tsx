import * as React from 'react';
import cn from 'classnames';
import './style.scss';

interface IRowProps {
  value?: any;
  arrow?: boolean;
  onClick?: (value?: any) => void;
  activeable?: boolean;
  className?: string;
  children: React.ReactNode;
  [otherProps: string]: any;
}

const CellRow: React.FC<IRowProps> = props => {
  const {
    value,
    arrow,
    onClick,
    activeable,
    className,
    children,
    ...otherProps
  } = props;

  const composeClassName = cn('x-cell__row', className, {
    'x-cell--activeable': onClick || activeable,
    'x-cell--arrow': arrow,
  });

  if (onClick) {
    const onClickHandle = () => {
      if (onClick) {
        onClick(value);
      }
    };
    return (
      <a {...otherProps} className={composeClassName} onClick={onClickHandle}>
        {children}
      </a>
    );
  }

  return (
    <div {...otherProps} className={composeClassName}>
      {children}
    </div>
  );
};

interface ICellProps {
  arrow?: boolean;
  indentLine?: boolean;
  onClick?: (value?: any) => void;
  className?: string;
  children: React.ReactNode;
  [otherProps: string]: any;
}

const Cell: React.FC<ICellProps> & { Row: React.FC<IRowProps> } = props => {
  const {
    arrow,
    indentLine,
    className,
    children,
    onClick,
    ...otherProps
  } = props;

  const composeClassName = cn('x-cell', className, {
    'x-cell--indent-line': indentLine,
  });

  const composeChildren: any[] = [];
  if (Array.isArray(children)) {
    composeChildren.push(...children);
  } else {
    composeChildren.push(children);
  }

  return (
    <section {...otherProps} className={composeClassName}>
      {composeChildren.map((children, index) => {
        if (children && children.type === CellRow) {
          return React.cloneElement(children, {
            key: index,
            arrow: arrow || children.props.arrow,
            onClick: onClick || children.props.onClick,
          });
        }
        return children;
      })}
    </section>
  );
};

Cell.Row = CellRow;

export default Cell;
