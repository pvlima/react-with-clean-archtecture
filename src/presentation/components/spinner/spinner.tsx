/* eslint-disable react/prop-types */
import React from 'react';
import Styles from './spinner-styles.scss';

type SpinnerProps = React.HTMLAttributes<HTMLElement>;

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div {...props} className={[Styles.spinner, className].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
