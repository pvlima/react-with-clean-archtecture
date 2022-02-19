import React from 'react';
import Styles from './input-styles.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

export function Input({ name, ...props }: InputProps) {
  return (
    <div className={Styles.inputWrap}>
      <input id={name} name={name} {...props} />
      <label htmlFor={name} className={Styles.status}>
        🔴
      </label>
    </div>
  );
}
