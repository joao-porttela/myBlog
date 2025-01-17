import {IModalDispatch} from "@/interfaces/modal/IModalDispatch";
import {IModalState} from "@/interfaces/modal/IModalState";

export function ModalReducer(
  state: IModalState,
  action: {type: string; payload?: IModalDispatch}
): IModalState {
  const {type} = action;

  switch (type) {
    case "open":
      if (action?.payload?.modal) {
        const {modal} = action?.payload;
        let data = {...state.data};

        if (action?.payload?.data) data = {...state.data, ...action?.payload?.data};

        console.log(data);

        return {...state, data, modal, isOpen: true};
      }

      return {...state};

    case "close":
      const isOpen = false;
      const modal = null;
      return {...state, isOpen, modal};

    default:
      return {...state};
  }
}
