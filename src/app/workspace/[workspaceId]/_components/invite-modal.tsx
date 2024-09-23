"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNewJoinCode } from "@/features/workspaces/api/use-new-join-code";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  joinCode: string;
};

const InviteModal = ({ open, setOpen, joinCode, name }: Props) => {
  const workspaceId = useWorkspaceId();

  const { mutate, isPending } = useNewJoinCode();

  const handleCopy = () => {
    const inviteLink = window.location.origin + `/join/${workspaceId}`;

    navigator.clipboard
      .writeText(inviteLink)
      .then(() => toast.success("Invite link copied to clipboard"));
  };

  const handleNewCode = () => {
    mutate(
      { workspaceId },
      {
        onSuccess: () => toast.success("Invite code regenerated"),
        onError: () => toast.error("Failed to regenerate invite code"),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite people to {name}</DialogTitle>
          <DialogDescription>
            Use the code below to invite people to your workspace
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-y-4 py-10">
          <p className="text-center text-4xl font-bold uppercase tracking-widest">
            {joinCode}
          </p>
          <Button
            className="space-x-4"
            variant={"ghost"}
            size="sm"
            onClick={handleCopy}
            disabled={isPending}
          >
            <span>Copy link</span> <CopyIcon className="size-5" />
          </Button>
        </div>
        <div className="flex w-full items-center justify-between">
          <Button
            onClick={handleNewCode}
            variant={"outline"}
            disabled={isPending}
          >
            New Code
            <RefreshCcwIcon className="ml-2 size-4" />
          </Button>
          <DialogClose asChild>
            <Button disabled={isPending}>Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
