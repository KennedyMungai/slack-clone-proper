"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRemoveChannel } from "@/features/channels/api/use-remove-channel";
import { useUpdateChannel } from "@/features/channels/api/use-update-channel";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useChannelId } from "@/hooks/use-channel-id";
import useConfirm from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { ChevronDownIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();

  const router = useRouter();

  const [ConfirmModal, confirm] = useConfirm({
    title: "Delete this channel?",
    message:
      "You are about to delete this channel. This action is irreversible",
  });

  const [editOpen, setEditOpen] = useState(false);
  const [value, setValue] = useState(title);

  const { mutate: updateChannel, isPending: isUpdatingChannel } =
    useUpdateChannel();

  const { mutate: removeChannel, isPending: isRemovingChannel } =
    useRemoveChannel();

  const { data: member } = useCurrentMember({
    workspaceId,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setValue(value);
  };

  const handleEditOpen = (value: boolean) => {
    if (member?.role !== "admin") return;

    setEditOpen(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateChannel(
      { id: channelId, name: value },
      {
        onSuccess: () => {
          toast.success("Channel Updated");
          setEditOpen(false);
        },
        onError: () => toast.error("Failed to update channel"),
      },
    );
  };

  const handleDelete = async () => {
    const ok = await confirm();

    if (!ok) return;

    removeChannel(
      { id: channelId },
      {
        onSuccess: () => {
          toast.success("Channel Deleted");

          router.replace(`/workspace/${workspaceId}`);
        },
        onError: () => toast.error("Failed to delete post"),
      },
    );
  };

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
            <Dialog open={editOpen} onOpenChange={handleEditOpen}>
              <DialogTrigger asChild>
                <div className="cursor-pointer rounded-lg border bg-white px-5 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Channel Name</p>
                    {member?.role === "admin" && (
                      <p className="text-sm font-semibold text-[#126483] hover:underline">
                        Edit
                      </p>
                    )}
                  </div>
                  <p className="text-sm"># {title}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename this channel</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <Input
                    value={value}
                    disabled={isUpdatingChannel}
                    onChange={handleChange}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="e.g. plan-budget"
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant={"outline"} disabled={isUpdatingChannel}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button disabled={isUpdatingChannel}>Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            {member?.role === "admin" && (
              <button
                className="flex cursor-pointer items-center gap-x-2 rounded-lg border bg-white px-5 py-4 text-rose-600 hover:bg-gray-50"
                onClick={handleDelete}
                disabled={isRemovingChannel}
              >
                <TrashIcon className="size-4" />
                <p className="text-sm font-semibold">Delete Channel</p>
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <ConfirmModal />
    </div>
  );
};

export default Header;
