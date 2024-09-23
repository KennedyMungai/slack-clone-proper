"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDownIcon, TrashIcon } from "lucide-react";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <div className="flex h-[49px] items-center overflow-hidden border-b bg-white px-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            className="w-auto overflow-hidden px-2 text-lg font-semibold"
            size="sm"
          >
            <span className="truncate"># {title}</span>
            <ChevronDownIcon className="ml-2 size-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="overflow-hidden bg-gray-50 p-0">
          <DialogHeader className="border-b bg-white p-4">
            <DialogTitle># {title}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-y-2 px-4 pb-4">
            <div className="cursor-pointer rounded-lg border bg-white px-5 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Channel Name</p>
                <p className="text-sm font-semibold text-[#126483] hover:underline">
                  Edit
                </p>
              </div>
              <p className="text-sm"># {title}</p>
            </div>
            <button className="flex cursor-pointer items-center gap-x-2 rounded-lg border bg-white px-5 py-4 text-rose-600 hover:bg-gray-50">
              <TrashIcon className="size-4" />
              <p className="text-sm font-semibold">Delete Channel</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
