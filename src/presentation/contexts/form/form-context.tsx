import React, { createContext, useContext } from 'react';

type FormContextData = {
  state: {
    isLoading: boolean;
  };
  errorState: {
    email?: string;
    password?: string;
    main?: string;
  };
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
