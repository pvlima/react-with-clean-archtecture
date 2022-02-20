import React, { useEffect, useState } from 'react';
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
} from '@/presentation/components';
import { FormContextProvider } from '@/presentation/contexts';
import { Validation } from '@/presentation/protocols';
import Styles from './login-styles.scss';

type LoginProps = {
  validation: Validation;
};

export function Login({ validation }: LoginProps) {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

  useEffect(() => {
    setState(currentState => ({
      ...currentState,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    }));
  }, [validation, state.email, state.password]);

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContextProvider value={{ state, setState }}>
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
