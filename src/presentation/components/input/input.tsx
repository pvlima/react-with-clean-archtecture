import { useForm } from '@/presentation/contexts';
import React from 'react';
import Styles from './input-styles.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

export function Input({ name, ...props }: InputProps) {
  const { state, setState } = useForm();
  const error = state[`${name}Error`];

  function enableInput(e: React.FocusEvent<HTMLInputElement>) {
    e.target.readOnly = false;
  }

  function getStatus(): string {
    return error ? '🔴' : '🟢';
  }

  function getTitle(): string {
    return error || 'Tudo certo';
  }

  function handleChange(e: React.FocusEvent<HTMLInputElement>) {
    setState(current => ({ ...current, [name]: e.target.value }));
  }

  return (
    <div className={Styles.inputWrap}>
      <input
        id={name}
        name={name}
        data-testid={name}
        {...props}
        readOnly
        onFocus={enableInput}
        autoComplete="off"
        onChange={handleChange}
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
