import React from 'react';
import { Footer, LoginHeader, Spinner } from '@/presentation/components';
import Styles from './login-styles.scss';

export function Login() {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Digite seu email"
          />
          <label htmlFor="email" className={Styles.status}>
            🔴
          </label>
        </div>
        <div className={Styles.inputWrap}>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <label htmlFor="password" className={Styles.status}>
            🔴
          </label>
        </div>
        <button type="submit" className={Styles.submit}>
          Entrar
        </button>
        <span className={Styles.link}>Criar conta</span>
        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Erro</span>
        </div>
      </form>
      <Footer />
    </div>
  );
}
