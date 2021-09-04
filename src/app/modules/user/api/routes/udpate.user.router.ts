import { IHttpRequest } from '../../../core/interfaces/http.request.interface';
import { IHttpResponse } from '../../../core/interfaces/http.response.interface';
import { IRouter } from '../../../core/interfaces/router.interface';
import { UserController } from '../../presenter/controllers/user.controller';
import { UserModel } from '../../infra/models/user.model';
export class UpdateUserRouter implements IRouter {
  userController: UserController;

  constructor(userController: UserController) {
    this.userController = userController;
  }

  async route(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { id } = httpRequest.params;
    const { name, email } = httpRequest.body;
    const userOrFailure = await this.userController.udpateUserController(
      new UserModel(id, name, email),
    );

    // TODO check failure
    // if (userOrFailure is Failure) {

    // }

    return {
      statusCode: 200,
      body: userOrFailure,
    };
  }
}
