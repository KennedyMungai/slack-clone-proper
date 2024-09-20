"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { TrashIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
};

const PreferencesModal = ({ initialValue, open, setOpen }: Props) => {
  const [value, setValue] = useState(initialValue);

  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden bg-gray-50 p-0">
        <DialogHeader className="border-b bg-white p-4">
          <DialogTitle>{value}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-2 px-4 pb-4">
          <div className="cursor-pointer rounded-lg border bg-white px-5 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Workspace Name</p>
              <p className="text-sm font-semibold text-[#1264A3] hover:underline">
                Edit
              </p>
            </div>
            <p className="text-sm">{value}</p>
          </div>
          <button
            disabled={false}
            onClick={() => {}}
            className="flex cursor-pointer items-center gap-x-2 rounded-lg border bg-white px-5 py-4 text-rose-600 hover:bg-gray-50"
          >
            <TrashIcon className="size-4" />
            <p className="text-sm font-semibold">Delete Workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreferencesModal;
