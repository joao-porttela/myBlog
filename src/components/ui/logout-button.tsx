import React from "react";

import {useAuth} from "@/hooks/use-auth";

import {LogOut} from "lucide-react";
import {cn} from "@/lib/utils";
import {toast} from "@/hooks/use-toast";

export default function LogoutButton({
  text,
  cl,
  size,
}: {
  text?: string;
  cl?: string;
  size?: number;
}) {
  const {logout} = useAuth();

  function logOut() {
    try {
      logout();
      toast({title: "Logged out successfully"});
    } catch {
      toast({title: "Logged out failed", variant: "destructive"});
    }
  }

  return (
    <div onClick={logOut} className={cn("", cl)}>
      <LogOut size={size ? size : 25} />
      {text}
    </div>
  );
}
