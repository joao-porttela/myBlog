"use client";

import React, {ReactNode, useEffect, useReducer} from "react";

import {AuthContext, authInitialState} from "@/context/auth-context";

import {AuthReducer} from "@/reducers/auth-reducer";

import {IUser} from "@/interfaces/user.interface";

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Login, Logout, Signup
 * track user status - whether or not they're logging in
 * track loading state - while we are determining if the user is logged in
 */

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, authInitialState);

  function auth(user: IUser, token: string) {
    dispatch({type: "loading"});
    dispatch({
      type: "auth",
      payload: {
        user,
        token,
      },
    });
    dispatch({type: "loading"});
  }

  function setValues() {
    const t = localStorage.getItem("__refresh_token__");

    const u = JSON.parse(localStorage.getItem("user"));

    if (t && u) {
      auth(u, t);
    } else {
    }

    return u;
  }

  useEffect(() => {
    setValues();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
