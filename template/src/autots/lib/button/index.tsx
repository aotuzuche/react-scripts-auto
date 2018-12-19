import * as React from 'react';
import cn from 'classnames';
import Spin from '../spin';
import './style.scss';

interface IProps {
  type?: 'primary' | 'danger' | 'default';
  disabled?: boolean;
  mini?: boolean;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
  [otherProps: string]: any;
}

const Button: React.FC<IProps> = props => {
  const {
    type,
    disabled,
    mini,
    loading,
    onClick,
    className,
    children,
    ...otherProps
  } = props;

  const composeClassName = cn(
    'x-button',
    {
      'x-button--disabled': disabled || loading,
      'x-button--mini': mini,
    },
    `x-button--${type}`,
    className,
  );

  return (
    <a {...otherProps} className={composeClassName} onClick={onClick}>
      {!!loading && <Spin className="x-button__loading" />}
      {children}
    </a>
  );
};

Button.defaultProps = {
  type: 'primary',
};

export default Button;
