import React from "react";
import {ICategory} from "../category.interface";

export interface IModalState {
  data?: ICategory;
  isOpen: boolean;
  modal: React.ReactNode;
}
