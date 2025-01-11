import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function layout({children}: Props) {
  return <div className="py-4 mx-4 md:mx-40">{children}</div>;
}
