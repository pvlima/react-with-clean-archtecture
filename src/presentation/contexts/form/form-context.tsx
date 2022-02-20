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

export function useForm(): FormContextData {
  const context = useContext(FormContext);
  if (!context)
    throw new Error('useForm() must be used within FormContextProvider');
  return context;
}
