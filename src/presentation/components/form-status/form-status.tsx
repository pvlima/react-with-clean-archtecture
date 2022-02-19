import React from 'react';
import { Spinner } from '..';
import Styles from './form-status-styles.scss';

type FormStatusProps = {
  errorMessage?: string;
};

export function FormStatus({ errorMessage }: FormStatusProps) {
  return (
    <div className={Styles.errorWrap}>
      <Spinner className={Styles.spinner} />
      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  );
}
