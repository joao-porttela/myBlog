import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({children}: Props) {
  return <div className="py-4 md:mx-40">{children}</div>;
}
