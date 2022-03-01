/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { render } from '@testing-library/react';
import { FormContextProvider } from '@/presentation/contexts';
import { Input } from '..';

describe('Input Component', () => {
  it('should begin with readOnly', () => {
    const { getByTestId } = render(
      <FormContextProvider
        value={{
          state: { isLoading: false, email: '', password: '' },
          setState: () => {},
        }}
      >
        <Input name="field" />
      </FormContextProvider>,
    );
    const input = getByTestId('field') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});
