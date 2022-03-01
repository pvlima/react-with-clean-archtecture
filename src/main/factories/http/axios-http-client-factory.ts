import { AxiosHttpClient } from '@/infra/http';

export function makeAxiosHttpClient() {
  return new AxiosHttpClient();
}
