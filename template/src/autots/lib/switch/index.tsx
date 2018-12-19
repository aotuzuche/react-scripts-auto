import * as React from 'react';
import classnames from 'classnames';
import './style.scss';

interface IProps {
  i?: string;
  o?: string;
  active: boolean;
  icon?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (checked: boolean) => void;
  [otherProps: string]: any;
}

const Switch: React.FC<IProps> = props => {
  const {
    i,
    o,
    active,
    icon,
    disabled,
    className,
    onChange,
    ...otherProps
  } = props;

  const composeClassName = classnames(
    'x-switch',
    {
      'x-switch--active': active,
      'x-switch--io': i && o,
      'x-switch--icon': icon,
      'x-switch--disabled': disabled,
    },
    className,
  );

  const hasIO: boolean = !!i && !!o;

  const onClick = () => {
    if (disabled) {
      return;
    }
    onChange!(!active);
  };

  return (
    <a
      {...otherProps}
      href="javascript:;"
      className={composeClassName}
      onClick={onClick}
    >
      {hasIO && <sub>{props.i}</sub>}
      {hasIO && <sup>{props.o}</sup>}
      <em />
    </a>
  );
};

export default Switch;
