import * as React from 'react';
import cn from 'classnames';
import './style.scss';

interface IProps {
  checked: boolean;
  disabled?: boolean;
  className?: string;
  text?: string;
  onChange: (checked: boolean) => void;
  [otherProps: string]: any;
}

const Radio: React.FC<IProps> = props => {
  const { checked, disabled, className, text, onChange, ...otherProps } = props;

  const composeClassName = cn(
    'x-radio',
    {
      'x-radio__checked': checked,
      'x-radio__disabled': disabled,
    },
    className,
  );

  const onClick = () => {
    if (disabled) {
      return;
    }
    onChange!(!checked);
  };

  return (
    <a {...otherProps} className={composeClassName} onClick={onClick}>
      <i className="x-radio__icon">
        <sup className="x-radio__tick" />
      </i>
      {!!text && <span className="x-radio__text">{text}</span>}
    </a>
  );
};

export default Radio;
