import {Dispatch} from "react";
import {IModalState} from "./IModalState";
import {IModalDispatch} from "./IModalDispatch";
import {IModalData} from "./IModalData";

export interface IModalContext {
  state: IModalState;
  dispatch: Dispatch<{type: string; payload?: IModalDispatch}>;
  setOpen: (modal?: React.ReactNode, dt?: IModalData) => void;
}
