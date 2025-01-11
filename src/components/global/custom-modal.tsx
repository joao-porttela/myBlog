// import React from "react";

// import {useModal} from "@/hooks/use-modal";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "../ui/dialog";

// type CustomModalProps = {
//   title: string;
//   subHeading: string;
//   children: React.ReactNode;
//   defaultOpen: boolean;
// };

// export default function CustomModal({
//   title,
//   subHeading,
//   children,
//   defaultOpen,
// }: CustomModalProps) {
//   const {state, dispatch} = useModal();

//   return (
//     <Dialog
//       open={state.isOpen || defaultOpen}
//       onOpenChange={() => {
//         dispatch({type: "close"});
//       }}
//     >
//       <DialogContent className="overflow-y-scroll md:max-h-[700px] h-[40rem] scale-90 md:scale-100 w-fit bg-card">
//         <DialogHeader className="pb-4 text-left">
//           <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
//           <DialogDescription>{subHeading}</DialogDescription>
//         </DialogHeader>
//         {children}
//       </DialogContent>
//     </Dialog>
//   );
// }
