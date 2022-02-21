import { useForm } from '@/presentation/contexts';
import React from 'react';
import { Spinner } from '..';
import Styles from './form-status-styles.scss';

export function FormStatus() {
  const { state } = useForm();
  const { isLoading, mainError } = state;
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && (
        <span data-testid="main-error" className={Styles.error}>
          {mainError}
        </span>
      )}
    </div>
  );
}
