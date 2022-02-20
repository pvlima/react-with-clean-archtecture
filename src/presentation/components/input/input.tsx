import React from 'react';
import Styles from './input-styles.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

export function Input({ name, ...props }: InputProps) {
  function enableInput(e: React.FocusEvent<HTMLInputElement>) {
    e.target.readOnly = false;
  }

  return (
    <div className={Styles.inputWrap}>
      <input
        id={name}
        name={name}
        {...props}
        readOnly
        onFocus={enableInput}
        autoComplete="off"
      />
      <label htmlFor={name} className={Styles.status}>
        🔴
      </label>
    </div>
  );
}
