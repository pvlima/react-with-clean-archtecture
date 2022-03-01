import React, { createContext, useContext } from 'react';

type State = {
  isLoading: boolean;
  email: string;
  password: string;
  emailError?: string;
  passwordError?: string;
  mainError?: string;
};

type FormContextData = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
};

const FormContext = createContext<FormContextData>(null);

export const FormContextProvider: React.FC<{ value: FormContextData }> = ({
  children,
  value,
}) => {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export function useFormContext(): FormContextData {
  const context = useContext(FormContext);
  return context;
}
