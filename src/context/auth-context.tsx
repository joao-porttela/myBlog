import {createContext} from "react";

import {IAuthContext} from "@/interfaces/auth/auth-context.interface";
import {IAuthState} from "@/interfaces/auth/auth-state.interface";

export const authInitialState: IAuthState = {
  user: null,
  token: null,
  loading: false,
};

export const AuthContext = createContext<IAuthContext>({
  state: authInitialState,
  auth: () => {},
});
