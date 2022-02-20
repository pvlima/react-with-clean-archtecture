import { useForm } from '@/presentation/contexts';
import React from 'react';
import Styles from './input-styles.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

export function Input({ name, ...props }: InputProps) {
  const { errorState } = useForm();
  const error = errorState[`${name}`];

  function enableInput(e: React.FocusEvent<HTMLInputElement>) {
    e.target.readOnly = false;
  }

  function getStatus(): string {
    return '🔴';
  }

  function getTitle(): string {
    return error;
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
      <label
        data-testid={`${name}-status`}
        htmlFor={name}
        className={Styles.status}
        title={getTitle()}
      >
        {getStatus()}
      </label>
    </div>
  );
}
