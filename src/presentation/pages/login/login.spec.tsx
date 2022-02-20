import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Login } from './login';

type SutTypes = {
  sut: RenderResult;
};

function makeSut() {
  const sut = render(<Login />);
  return { sut };
}

describe('Login Component', () => {
  it('should start with initial state', () => {
    const { sut } = makeSut();
    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();
    const emailStatus = sut.getByTestId('email-status') as HTMLInputElement;
    expect(emailStatus.title).toBe('Campo obrigatório');
    expect(emailStatus.textContent).toBe('🔴');
    const passwordStatus = sut.getByTestId(
      'password-status',
    ) as HTMLInputElement;
    expect(passwordStatus.title).toBe('Campo obrigatório');
    expect(passwordStatus.textContent).toBe('🔴');
  });
});
