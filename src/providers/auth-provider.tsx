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

    // Store user and token in local storage
    localStorage.setItem("__refresh_token__", token);
    localStorage.setItem("user", JSON.stringify(user));

    dispatch({
      type: "auth",
      payload: {
        user,
        token,
      },
    });
  }

  function logout() {
    localStorage.removeItem("__refresh_token__");
    localStorage.removeItem("user");

    dispatch({type: "logout"});
  }

  useEffect(() => {
    const t = localStorage.getItem("__refresh_token__");

    const u = JSON.parse(localStorage.getItem("user"));

    if (t && u) {
      auth(u, t);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        auth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
