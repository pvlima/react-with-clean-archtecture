import React, { useEffect, useState } from 'react';
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
} from '@/presentation/components';
import { FormContextProvider } from '@/presentation/contexts';
import { Validation } from '@/presentation/protocols';
import { Authentication } from '@/domain/usecases';
import Styles from './login-styles.scss';

type LoginProps = {
  validation: Validation;
  authentication: Authentication;
};

export function Login({ validation, authentication }: LoginProps) {
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.isLoading || state.emailError || state.passwordError) return;
    setState(currentState => ({ ...currentState, isLoading: true }));
    await authentication.auth({ email: state.email, password: state.password });
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContextProvider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
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
            disabled={!!state.emailError || !!state.passwordError}
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
