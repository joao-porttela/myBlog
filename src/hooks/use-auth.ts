"use client";

import {useContext} from "react";

import {AuthContext} from "@/context/auth-context";
import {IAuthContext} from "@/interfaces/auth/auth-context.interface";

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
