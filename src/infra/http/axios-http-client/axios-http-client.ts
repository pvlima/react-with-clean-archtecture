/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from '@/data/protocols/http';

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>;
    try {
      httpResponse = await axios.post(params.url, params.body);
    } catch (e) {
      const error = e as AxiosError;
      httpResponse = error.response;
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
