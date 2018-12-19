import * as React from 'react';
import cn from 'classnames';
import './style.scss';

interface IProps {
  type?: 'text' | 'password' | 'number';
  className?: string;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  error?: boolean;
  multi?: boolean;
  disabled?: boolean;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  [otherProps: string]: any;
}

const Input: React.FC<IProps> = props => {
  const {
    type,
    className,
    addonBefore,
    addonAfter,
    error,
    multi,
    disabled,
    value,
    onChange,
    ...otherProps
  } = props;

  const composeClassName = cn(
    'x-input',
    {
      'x-input--error': error,
      'x-input--multi': multi,
      'x-input--disabled': disabled,
    },
    className,
  );

  if (multi) {
    return (
      <div className={composeClassName}>
        {!!addonBefore && (
          <div className="x-input__addon-before">{addonBefore}</div>
        )}
        <textarea
          {...otherProps}
          disabled={disabled}
          className="x-input__ipt"
          value={value}
          onChange={onChange}
        />
        {!!addonAfter && (
          <div className="x-input__addon-after">{addonAfter}</div>
        )}
      </div>
    );
  }

  return (
    <div className={composeClassName}>
      {!!addonBefore && (
        <div className="x-input__addon-before">{addonBefore}</div>
      )}
      <input
        {...otherProps}
        disabled={disabled}
        className="x-input__ipt"
        value={value}
        onChange={onChange}
        type={type || 'text'}
      />
      {!!addonAfter && <div className="x-input__addon-after">{addonAfter}</div>}
    </div>
  );
};

export default Input;
