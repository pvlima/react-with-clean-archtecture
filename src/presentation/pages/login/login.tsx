import React, { useState } from 'react';
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
} from '@/presentation/components';
import { FormContextProvider } from '@/presentation/contexts';
import Styles from './login-styles.scss';

export function Login() {
  const [state] = useState({
    isLoading: false,
  });

  const [errorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: '',
  });

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContextProvider value={{ state, errorState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input name="email" type="email" placeholder="Digite seu email" />
          <Input
            name="password"
            type="password"
            placeholder="Digite sua senha"
          />

          <button
            data-testid="submit"
            type="submit"
            className={Styles.submit}
            disabled
          >
            Entrar
          </button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </FormContextProvider>
      <Footer />
    </div>
  );
}
