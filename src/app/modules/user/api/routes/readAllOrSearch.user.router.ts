import { IHttpRequest } from '../../../core/interfaces/http.request.interface';
import { IHttpResponse } from '../../../core/interfaces/http.response.interface';
import { IRouter } from '../../../core/interfaces/router.interface';
import { UserController } from '../../presenter/controllers/user.controller';

export class ReadAllOrSearchUserRouter implements IRouter {
  userController: UserController;

  constructor(userController: UserController) {
    this.userController = userController;
  }

  async route(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { search } = httpRequest.query;

    const usersOrFailure =
      search && search !== ''
        ? await this.userController.readAllUserController()
        : await this.userController.readByFilterUserController(search);

    // TODO check failure
    // if (userOrFailure is Failure) {

    // }

    return {
      statusCode: 200,
      body: usersOrFailure,
    };
  }
}
