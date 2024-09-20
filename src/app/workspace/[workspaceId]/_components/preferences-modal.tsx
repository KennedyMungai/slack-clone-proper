"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
};

const PreferencesModal = ({ initialValue, open, setOpen }: Props) => {
  const [value, setValue] = useState(initialValue);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PreferencesModal;
