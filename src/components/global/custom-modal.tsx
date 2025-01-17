import React from "react";

// Hooks
import {useModal} from "@/hooks/use-modal";

// UI
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {ScrollArea} from "../ui/scroll-area";

type CustomModalProps = {
  title: string;
  subHeading: string;
  children: React.ReactNode;
  defaultOpen: boolean;
};

export default function CustomModal({
  title,
  subHeading,
  children,
  defaultOpen,
}: CustomModalProps) {
  const {state, dispatch} = useModal();

  return (
    <Dialog
      open={state.isOpen || defaultOpen}
      onOpenChange={() => {
        dispatch({type: "close"});
      }}
    >
      <ScrollArea>
        <DialogContent className="md:max-h-[700px] scale-90 md:scale-100 w-fit bg-card">
          <DialogHeader className="pb-4 text-left">
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
            <DialogDescription>{subHeading}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </ScrollArea>
    </Dialog>
  );
}
