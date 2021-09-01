import { IHttpRequest } from '../../../core/interfaces/http.request.interface';
import { IHttpResponse } from '../../../core/interfaces/http.response.interface';
import { IRouter } from '../../../core/interfaces/router.interface';
import { UserController } from '../../presenter/controllers/user.controller';

export interface ICreateUserRouteArgs {
  userController: UserController;
}

export class CreateUserRouter implements IRouter {
  userController: UserController;

  constructor(args: ICreateUserRouteArgs) {
    this.userController = args.userController;
  }

  async route(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { name, email } = httpRequest.body;
    const userOrFailure = await this.userController.createUser({ name, email });

    // TODO check failure
    // if (userOrFailure is Failure) {

    // }

    console.log('oi');

    return {
      statusCode: 200,
      body: userOrFailure,
    };
  }
}
