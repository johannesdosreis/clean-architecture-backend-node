import { IHttpRequest } from './http.request.interface';
import { IHttpResponse } from './http.response.interface';

export interface IRouter {
  route(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}
