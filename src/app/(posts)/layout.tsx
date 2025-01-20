import React from "react";

import {PrimeReactProvider} from "primereact/api";

type Props = {
  children: React.ReactNode;
};

export default function Layout({children}: Props) {
  return <PrimeReactProvider>{children}</PrimeReactProvider>;
}
