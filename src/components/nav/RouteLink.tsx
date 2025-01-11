import Link from "next/link";
import React from "react";
import {IRoute} from "./interfaces/IRoute";
import {cn} from "@/lib/utils";

type RouteLinkProps = {
  children: React.ReactNode;
  route: IRoute;
  className?: string;
  onClick?: () => void;
};

export default function RouteLink({children, route, className, onClick}: RouteLinkProps) {
  return (
    <Link
      key={route.href}
      href={route.href}
      className={cn(
        "relative text-sm font-medium transition-all hover:text-primary",
        route.active ? "text-muted" : "text-muted-foreground",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
