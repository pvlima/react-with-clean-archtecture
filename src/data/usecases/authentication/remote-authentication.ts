import { Authentication, AuthenticationParams } from '@/domain/usecases';
import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';
import {
  InvalidCredentialsError,
  NotFoundError,
  UnexpectedError,
} from '@/domain/errors';
import { AccountModel } from '@/domain/models';

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >,
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const response = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body;
        break;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      case HttpStatusCode.notFound:
        throw new NotFoundError();

      default:
        throw new UnexpectedError();
        break;
    }
  }
}
