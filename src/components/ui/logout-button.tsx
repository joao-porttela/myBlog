import React from "react";

import {useAuth} from "@/hooks/use-auth";

import {LogOut} from "lucide-react";
import {cn} from "@/lib/utils";

export default function LogoutButton({
  text,
  cl,
  size,
}: {
  text?: string;
  cl?: string;
  size?: number;
}) {
  const {setToken} = useAuth();

  function Logout() {
    // Remove token and user from local storage/cookies
    localStorage.removeItem("__refresh_token__");
    localStorage.removeItem("user");

    // Set token from auth context to null
    setToken(null);
  }

  return (
    <div onClick={() => Logout()} className={cn("", cl)}>
      <LogOut size={size ? size : 25} />
      {text}
    </div>
  );
}
