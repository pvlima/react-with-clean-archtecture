import { useForm } from '@/presentation/contexts/form/form-context';
import React from 'react';
import { Spinner } from '..';
import Styles from './form-status-styles.scss';

export function FormStatus() {
  const { isLoading, errorMessage } = useForm();
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  );
}
