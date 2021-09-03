import { IHttpRequest } from '../../../core/interfaces/http.request.interface';
import { IHttpResponse } from '../../../core/interfaces/http.response.interface';
import { IRouter } from '../../../core/interfaces/router.interface';
import { UserController } from '../../presenter/controllers/user.controller';

export class ReadByIdUserRouter implements IRouter {
  userController: UserController;

  constructor(userController: UserController) {
    this.userController = userController;
  }

  async route(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { id } = httpRequest.params;
    const userOrFailure = await this.userController.readByIdUserController(id);

    // TODO check failure
    // if (userOrFailure is Failure) {

    // }

    return {
      statusCode: 200,
      body: userOrFailure,
    };
  }
}
