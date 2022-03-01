import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication';
import { Authentication } from '@/domain/usecases';
import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories/http';

export function makeRemoteAuthentication(): Authentication {
  return new RemoteAuthentication(makeApiUrl(), makeAxiosHttpClient());
}
