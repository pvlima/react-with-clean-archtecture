import React from 'react';
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
} from '@/presentation/components';
import Styles from './login-styles.scss';

export function Login() {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input name="email" type="email" placeholder="Digite seu email" />
        <Input name="password" type="password" placeholder="Digite sua senha" />

        <button type="submit" className={Styles.submit}>
          Entrar
        </button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus errorMessage="algo errado não está certo" />
      </form>
      <Footer />
    </div>
  );
}
