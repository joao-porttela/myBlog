"use client";

import React, {useState, ReactNode, useEffect} from "react";

import {AuthContext} from "@/context/auth-context";
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
  const [user, setUser] = useState<IUser | null>(null); // User state
  const [token, setToken] = useState<string | null>(null); // Authentication token
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  function setValues() {
    const t = localStorage.getItem("__refresh_token__");

    if (t) {
      setToken(t);
    } else {
      setToken(null);
    }

    const u = localStorage.getItem("user");

    if (u) {
      setUser(JSON.parse(u));
    } else {
      setUser(null);
    }

    return u;
  }

  useEffect(() => {
    setLoading(true);

    setValues();

    setLoading(false);
  }, [token]);

  return (
    <AuthContext.Provider value={{user, token, loading, setLoading, setUser, setToken}}>
      {children}
    </AuthContext.Provider>
  );
};
