import { HttpPostClient, HttpPostParams } from '../http/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;

  post(params: HttpPostParams): Promise<void> {
    this.url = params.url;
    return Promise.resolve();
  }
}
