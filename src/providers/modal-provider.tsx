"use client";

import React, {useState, useEffect, useReducer} from "react";

import {ModalContext, modalInitialState} from "@/context/modal-context";

import {ModalReducer} from "../reducers/modal-reducer";

import {IModalProviderProps} from "@/interfaces/modal/IModalProvidersProps";
import {IModalData} from "@/interfaces/modal/IModalData";

export function ModalProvider({children}: IModalProviderProps) {
  const [state, dispatch] = useReducer(ModalReducer, modalInitialState);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const setOpen = async (modal?: React.ReactNode, dt?: IModalData) => {
    if (modal) {
      dispatch({type: "open", payload: {modal, data: dt ? dt : null}});
    }
  };

  if (!isMounted) return null;

  return (
    <ModalContext.Provider value={{state, dispatch, setOpen}}>
      {children}
      {state.modal}
    </ModalContext.Provider>
  );
}
