import {IUser} from "./user.interface";

export interface IAuthContext {
  user: IUser | null;
  loading: boolean;
  token: string | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}
