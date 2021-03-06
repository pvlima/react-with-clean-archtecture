import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
  const history = useHistory();
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
    try {
      if (state.isLoading || state.emailError || state.passwordError) return;
      setState(currentState => ({ ...currentState, isLoading: true }));
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });
      localStorage.setItem('accessToken', account.accessToken);
      history.replace('/');
    } catch (e) {
      setState(currentState => ({
        ...currentState,
        isLoading: false,
        mainError: e.message,
      }));
    }
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
          <Link data-testid="signup" to="/signup" className={Styles.link}>
            Criar conta
          </Link>
          <FormStatus />
        </form>
      </FormContextProvider>
      <Footer />
    </div>
  );
}
