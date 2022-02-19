import React, { memo } from 'react';
import { Logo } from '..';
import Styles from './login-header-styles.scss';

function LoginHeaderComponent() {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>Enquete para programadores</h1>
    </header>
  );
}

export const LoginHeader = memo(LoginHeaderComponent);
