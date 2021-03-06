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
import { Login } from '@/presentation/pages';

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

async function simulateClickSubmit(sut: RenderResult) {
  const form = sut.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
}

async function simulateValidSubmit(
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password(),
) {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);
  await simulateClickSubmit(sut);
}

function testStatusForField(
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
) {
  const status = sut.getByTestId(`${fieldName}-status`);
  expect(status.title).toBe(validationError || 'Tudo certo');
  expect(status.textContent).toBe(validationError ? '????' : '????');
}

function testErrorWrapChildCount(sut: RenderResult, count: number) {
  const errorWrap = sut.getByTestId('error-wrap');
  expect(errorWrap.childElementCount).toBe(count);
}

function testElementExists(sut: RenderResult, fieldName: string) {
  const el = sut.getByTestId(fieldName);
  expect(el).toBeTruthy();
}

function testElementText(sut: RenderResult, fieldName: string, text: string) {
  const el = sut.getByTestId(fieldName);
  expect(el.textContent).toBe(text);
}

function testButtonIsDisabled(
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean,
) {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
}

describe('Login Component', () => {
  afterEach(cleanup);
  beforeEach(() => {
    localStorage.clear();
  });

  it('should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    testErrorWrapChildCount(sut, 0);
    testButtonIsDisabled(sut, 'submit', true);
    testStatusForField(sut, 'email', validationError);
    testStatusForField(sut, 'password', validationError);
  });

  it('should show email error if Validaton fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateEmailField(sut);
    testStatusForField(sut, 'email', validationError);
  });

  it('should show password error if Validaton fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populatePasswordField(sut);
    testStatusForField(sut, 'password', validationError);
  });

  it('should show valid email state if Validaton succeeds', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    testStatusForField(sut, 'email');
  });

  it('should show valid password state if Validaton succeeds', () => {
    const { sut } = makeSut();
    populatePasswordField(sut);
    testStatusForField(sut, 'password');
  });

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);
    testButtonIsDisabled(sut, 'submit', false);
  });

  it('should show spinner on submit', async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);
    testElementExists(sut, 'spinner');
  });

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({ email, password });
  });

  it('should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut();
    await simulateValidSubmit(sut);
    await simulateClickSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });
    await simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(0);
  });

  it('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error));
    await simulateValidSubmit(sut);
    testElementText(sut, 'main-error', error.message);
    testErrorWrapChildCount(sut, 1);
  });

  it('should add accessToken to localstorage on success', async () => {
    const { sut, authenticationSpy } = makeSut();
    await simulateValidSubmit(sut);
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
