import {Dispatch, SetStateAction} from "react";
import {IUser} from "../user.interface";

export interface IAuthContext {
  user: IUser | null;
  loading: boolean;
  token: string | null;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  setToken: Dispatch<SetStateAction<string | null>>;
}
