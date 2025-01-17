import {createContext} from "react";

import {IAuthContext} from "@/interfaces/auth/auth-context.interface";

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
