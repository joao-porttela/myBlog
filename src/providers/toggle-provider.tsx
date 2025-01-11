"use client";

import React, {createContext, useContext, useState} from "react";

type ToggleContextType = {
  toggle: boolean;
  setToggle: (value: boolean) => void;
};

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

export function ToggleProvider({children}: {children: React.ReactNode}) {
  const [toggle, setToggleState] = useState(false);

  const setToggle = (value: boolean) => {
    setToggleState(value);
    const body = document.querySelector("body");
    if (value) {
      body?.classList.add("overflow-hidden");
    } else {
      body?.classList.remove("overflow-hidden");
    }
  };

  return (
    <ToggleContext.Provider value={{toggle, setToggle}}>
      {children}
    </ToggleContext.Provider>
  );
}

export function useToggle() {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error("useToggle must be used within a ToggleProvider");
  }
  return context;
}
