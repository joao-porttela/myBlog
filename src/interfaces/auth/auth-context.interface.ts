import {IUser} from "../user.interface";
import {IAuthState} from "./auth-state.interface";

export interface IAuthContext {
  state: IAuthState;
  auth: (user: IUser, token: string) => void;
}
