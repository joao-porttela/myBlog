"use client";

import React from "react";
import Link from "next/link";

// Components
import Theme from "@/components/global/Theme";
import MobileMainNav from "./MobileMainNav";
import Nav from "./Nav";

// Hooks
import {usePathname} from "next/navigation";
import {useAuth} from "@/hooks/use-auth";
import {useIsMobile} from "@/hooks/use-mobile";

// Icons
import {Home, CircleUser, Rss, NotepadTextDashed} from "lucide-react";

// Interfaces
import {IRoute} from "./interfaces/IRoute";
import LogoutButton from "../ui/logout-button";

export default function Navigation() {
  const {user} = useAuth();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const routes: Array<IRoute> = [
    {
      href: `/`,
      label: "Home",
      icon: <Home />,
      active: pathname === "/",
    },
    {
      href: "/posts",
      label: "Posts",
      icon: <NotepadTextDashed />,
      active: pathname.includes("/posts"),
    },
    {
      href: user ? "/account" : `/auth/login`,
      label: user ? "Account" : "Login",
      icon: <CircleUser />,
      active:
        pathname === `/account` ||
        pathname === `/auth/login` ||
        pathname === `/auth/sign-up` ||
        pathname === `/auth/`,
    },
  ];

  return (
    <div className="sticky w-full py-4 top-0 left-0 flex items-center justify-between px-4 z-20 bg-secondary md:px-40">
      <aside>
        <Link href="/" className="flex items-center gap-2">
          <Rss />
          <span className="text-xl font-bold">myBlog</span>
        </Link>
      </aside>

      <div className="flex items-center justify-center space-x-4">
        {isMobile ? (
          <MobileMainNav className="md:hidden" routes={routes} />
        ) : (
          <Nav className="hidden md:flex" routes={routes} />
        )}

        {user && !isMobile && (
          <LogoutButton
            cl="text-black bg-destructive hover:bg-destructive-foreground hover:cursor-pointer rounded-md p-2"
            size={20}
          />
        )}
        <Theme />
      </div>
    </div>
  );
}
