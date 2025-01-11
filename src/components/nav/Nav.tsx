import React from "react";

import {cn} from "@/lib/utils";
import {IRoute} from "./interfaces/IRoute";
import RouteLink from "./RouteLink";

interface MainNavProps {
  className?: string;
  routes?: IRoute[];
}

export default function Nav({className, routes}: MainNavProps) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes &&
        routes.map((route) => (
          <RouteLink key={route.href} route={route}>
            {route.icon}
          </RouteLink>
        ))}
    </nav>
  );
}
