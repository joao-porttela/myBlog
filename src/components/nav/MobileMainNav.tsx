"use client";

import React from "react";

import {LucideAlignRight, X} from "lucide-react";

import {cn} from "@/lib/utils";

import {useToggle} from "@/providers/toggle-provider";

import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator";
import {IRoute} from "./interfaces/IRoute";
import RouteLink from "./RouteLink";
import LogoutButton from "../ui/logout-button";
import {useAuth} from "@/hooks/use-auth";

interface MobileMainProps {
  className?: string;
  routes?: IRoute[];
}

export default function MobileMainNav({className, routes}: MobileMainProps) {
  const {toggle, setToggle} = useToggle();
  const {state} = useAuth();

  const toggleNav = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <nav className={cn("flex items-center", className)}>
        {toggle ? (
          <X
            className="inline-flex items-center justify-center rounded-md text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
            onClick={toggleNav}
            size={30}
          />
        ) : (
          <LucideAlignRight
            className="inline-flex items-center justify-center rounded-md text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
            onClick={toggleNav}
            size={30}
          />
        )}

        {toggle && (
          <div
            className={cn(
              "absolute transition-all duration-500 top-full flex flex-col w-full h-screen bg-background border-t-border left-0 pt-2 pb-3 px-4 z-50"
            )}
          >
            <div className="flex flex-col gap-80">
              <ScrollArea className="h-full w-full">
                {routes &&
                  routes.map((route) => {
                    return (
                      <div className="relative" key={route.href}>
                        <div className="py-5">
                          <RouteLink
                            route={route}
                            className="flex items-center ml-1 gap-4 text-xl"
                            onClick={() => {
                              setToggle(false);
                              document
                                .querySelector("body")
                                ?.classList.remove("overflow-hidden");
                            }}
                          >
                            {route.icon}
                            {route.label}
                          </RouteLink>
                        </div>
                        <Separator />
                      </div>
                    );
                  })}
              </ScrollArea>

              {state.user && (
                <div className="relative">
                  <Separator className="bg-destructive" />
                  <div className="py-5">
                    <div
                      onClick={() => {
                        setToggle(false);
                        document
                          .querySelector("body")
                          ?.classList.remove("overflow-hidden");
                      }}
                    >
                      <LogoutButton
                        text="Logout"
                        cl="flex items-center ml-1 gap-4 text-xl text-destructive"
                      />
                    </div>
                  </div>
                  <Separator className="bg-destructive" />
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
