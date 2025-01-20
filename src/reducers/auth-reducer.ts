import {IAuthDispatch} from "@/interfaces/auth/auth-dispatch.interface";
import {IAuthState} from "@/interfaces/auth/auth-state.interface";

export function AuthReducer(
  state: IAuthState,
  action: {type: string; payload?: IAuthDispatch}
): IAuthState {
  const {type} = action;

  switch (type) {
    case "auth":
      if (!action?.payload?.user || !action?.payload?.token) return {...state};

      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "logout":
      state.token = null;
      state.user = null;

    case "loading":
      return {...state, loading: !state.loading};

    default:
      return {...state};
  }
}
