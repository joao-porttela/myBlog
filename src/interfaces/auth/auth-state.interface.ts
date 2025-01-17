import {IUser} from "../user.interface";

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
}
