import {useContext} from "react";

import {ModalContext} from "@/context/modal-context";

export function useModal() {
  const context = useContext(ModalContext);

  if (context === undefined)
    throw new Error("ModalContext was used outside of ModalProvider");

  return context;
}
