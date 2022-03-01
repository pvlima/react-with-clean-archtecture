/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FormContextProvider } from '@/presentation/contexts';
import { Input } from '..';

function makeSut() {
  return render(
    <FormContextProvider
      value={{
        state: { isLoading: false, email: '', password: '' },
        setState: () => {},
      }}
    >
      <Input name="field" />
    </FormContextProvider>,
  );
}

describe('Input Component', () => {
  it('should begin with readOnly', () => {
    const sut = makeSut();
    const input = sut.getByTestId('field') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  it('should remove readOnly on focus', () => {
    const sut = makeSut();
    const input = sut.getByTestId('field') as HTMLInputElement;
    fireEvent.focus(input);
    expect(input.readOnly).toBe(false);
  });
});
