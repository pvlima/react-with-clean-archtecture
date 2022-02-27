import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import faker from 'faker';
import 'jest-localstorage-mock';
import { AuthenticationSpy, ValidationStub } from '@/presentation/test';
import { InvalidCredentialsError } from '@/domain/errors';
import { Login } from './login';

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });
function makeSut(params?: SutParams): SutTypes {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const authenticationSpy = new AuthenticationSpy();
  const sut = render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />,
    </Router>,
  );
  return { sut, authenticationSpy };
}

function populateEmailField(sut: RenderResult, email = faker.internet.email()) {
  const emailInput = sut.getByTestId('email');
  fireEvent.input(emailInput, { target: { value: email } });
}

function populatePasswordField(
  sut: RenderResult,
  password = faker.internet.password(),
) {
  const passwordInput = sut.getByTestId('password');
  fireEvent.input(passwordInput, {
    target: { value: password },
  });
}

function simulateClickSubmit(sut: RenderResult) {
  const submitButton = sut.getByTestId('submit');
  fireEvent.click(submitButton);
}

function simulateValidSubmit(
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password(),
) {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);
  simulateClickSubmit(sut);
}

function simulateStatusForField(
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
) {
  const status = sut.getByTestId(`${fieldName}-status`);
  expect(status.title).toBe(validationError || 'Tudo certo');
  expect(status.textContent).toBe(validationError ? '🔴' : '🟢');
}

describe('Login Component', () => {
  afterEach(cleanup);
  beforeEach(() => {
    localStorage.clear();
  });

  it('should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();
    simulateStatusForField(sut, 'email', validationError);
    simulateStatusForField(sut, 'password', validationError);
  });

  it('should show email error if Validaton fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateEmailField(sut);
    simulateStatusForField(sut, 'email', validationError);
  });

  it('should show password error if Validaton fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populatePasswordField(sut);
    simulateStatusForField(sut, 'password', validationError);
  });

  it('should show valid email state if Validaton succeeds', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    simulateStatusForField(sut, 'email');
  });

  it('should show valid password state if Validaton succeeds', () => {
    const { sut } = makeSut();
    populatePasswordField(sut);
    simulateStatusForField(sut, 'password');
  });

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  it('should show spinner on submit', () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);
    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  it('should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({ email, password });
  });

  it('should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut();
    simulateValidSubmit(sut);
    simulateClickSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('should not call Authentication if form is invalid', () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });
    populateEmailField(sut);
    const form = sut.getByTestId('form');
    fireEvent.submit(form);
    expect(authenticationSpy.callsCount).toBe(0);
  });

  it('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error));
    simulateValidSubmit(sut);
    const errorWrap = sut.getByTestId('error-wrap');
    await waitFor(() => errorWrap);
    const mainError = sut.getByTestId('main-error');
    expect(mainError.textContent).toBe(error.message);
    expect(errorWrap.childElementCount).toBe(1);
  });

  it('should add accessToken to localstorage on success', async () => {
    const { sut, authenticationSpy } = makeSut();
    simulateValidSubmit(sut);
    await waitFor(() => sut.getByTestId('form'));
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'accessToken',
      authenticationSpy.account.accessToken,
    );
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  it('should go to signup page', async () => {
    const { sut } = makeSut();
    const signup = sut.getByTestId('signup');
    fireEvent.click(signup);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/signup');
  });
});
