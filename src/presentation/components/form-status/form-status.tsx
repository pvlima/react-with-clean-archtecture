import { useForm } from '@/presentation/contexts';
import React from 'react';
import { Spinner } from '..';
import Styles from './form-status-styles.scss';

export function FormStatus() {
  const { state, errorState } = useForm();
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {state.isLoading && <Spinner className={Styles.spinner} />}
      {errorState.main && (
        <span className={Styles.error}>{errorState.main}</span>
      )}
    </div>
  );
}
