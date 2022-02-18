import faker from 'faker';

import {
  mockAccountModel,
  mockAuthentication,
} from '@/domain/test/mock-account';
import { HttpPostClientSpy } from '@/data/test';
import {
  InvalidCredentialsError,
  NotFoundError,
  UnexpectedError,
} from '@/domain/errors';
import { HttpStatusCode } from '@/data/protocols/http';
import { AuthenticationParams } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { RemoteAuthentication } from './remote-authentication';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    AccountModel
  >();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return { sut, httpPostClientSpy };
};

describe('RemoteAuthentication', () => {
  it('should call HttpClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });

  it('should call HttpClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  it('should throw InvalidCredentialsError if HttpPostClient return 401', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const authenticationParams = mockAuthentication();
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it('should throw UnexpectedError if HttpPostClient return 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const authenticationParams = mockAuthentication();
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('should throw NotFoundError if HttpPostClient return 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const authenticationParams = mockAuthentication();
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow(new NotFoundError());
  });

  it('should throw UnexpectedError if HttpPostClient return 500', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const authenticationParams = mockAuthentication();
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('should return an AccountModal if HttpPostClient return 200', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const httpResult = mockAccountModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const authenticationParams = mockAuthentication();
    const account = await sut.auth(authenticationParams);
    await expect(account).toEqual(httpResult);
  });
});
