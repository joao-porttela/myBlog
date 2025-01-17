import {createContext} from "react";

import {IModalContext} from "@/interfaces/modal/IModalContext";
import {IModalState} from "@/interfaces/modal/IModalState";

export const modalInitialState: IModalState = {
  isOpen: false,
  modal: null,
};

export const ModalContext = createContext<IModalContext>({
  state: modalInitialState,
  dispatch: () => null,
  setOpen: () => {},
});
