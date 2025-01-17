import {IUser} from "../user.interface";

export interface IAuthDispatch {
  user?: IUser;
  token?: string;
}
