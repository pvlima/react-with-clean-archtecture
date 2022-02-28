import React from 'react';
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client';
import { Login } from '@/presentation/pages';
import {
  ValidationBuilder,
  ValidationComposite,
} from '@/validation/validators';

export function makeLogin() {
  const url = 'http://fordevs.herokuapp.com/api/login';
  const axiosHttpClient = new AxiosHttpClient();
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient);
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').email().required().build(),
    ...ValidationBuilder.field('password').min(5).required().build(),
  ]);
  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  );
}
