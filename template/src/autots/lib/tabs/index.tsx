import * as React from 'react';
import cn from 'classnames';
import './style.scss';

interface IItemProps {
  value: string | number | boolean;
  className?: string;
  children: React.ReactNode;
  [otherProps: string]: any;
}

const TabsItem: React.FC<IItemProps> = props => {
  const { active, value, className, onClick, children, ...otherProps } = props;

  const composeClassName = cn(
    'x-tabs__item',
    {
      'x-tabs--active': !!active,
    },
    className,
  );

  const onAClick = () => {
    onClick!(value);
  };

  return (
    <a
      {...otherProps}
      href="javascript:;"
      className={composeClassName}
      onClick={onAClick}
    >
      {children}
    </a>
  );
};

interface ITabsProps {
  className?: string;
  active: string | number | boolean;
  onClick: (value: string | number | boolean) => void;
  [otherProps: string]: any;
}

const Tabs: React.FC<ITabsProps> & { Item: React.FC<IItemProps> } = props => {
  const { className, children, active, onClick, ...otherProps } = props;
  const composeClassName = cn('x-tabs', className);

  let activeOffset = -2;

  let composeChildren: any[] = [];
  if (Array.isArray(children)) {
    composeChildren.push(...children);
  } else {
    composeChildren.push(children);
  }

  composeChildren = composeChildren.map((res, index) => {
    const act =
      props.hasOwnProperty('active') && res.props.value === props.active;
    if (act) {
      activeOffset = index;
    }
    return React.cloneElement(res, {
      active: act,
      key: index,
      value: res.props.value,
      onClick: props.onClick,
      children: res.props.children,
    });
  });

  const len = composeChildren.length;

  return (
    <div {...otherProps} className={composeClassName}>
      <sub
        className="x-tabs__line"
        style={{
          width: `${100 / len}%`,
          WebkitTransform: `translate(${activeOffset * 100}%,0)`,
        }}
      />
      {composeChildren}
    </div>
  );
};

Tabs.Item = TabsItem;

export default Tabs;
