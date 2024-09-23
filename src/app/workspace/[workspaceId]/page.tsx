"use client";

import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { LoaderIcon, TriangleAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const Workspace = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelModal();

  const { data: workspace, isLoading: isWorkspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: isChannelsLoading } = useGetChannels({
    workspaceId,
  });
  const { data: member, isLoading: isMemberLoading } = useCurrentMember({
    workspaceId,
  });

  const channelId = useMemo(() => channels?.[0]?._id, [channels]);
  const isAdmin = useMemo(() => member?.role === "admin", [member?.role]);

  useEffect(() => {
    if (
      isWorkspaceLoading ||
      isChannelsLoading ||
      !workspace ||
      isMemberLoading ||
      !member
    )
      return;

    if (channelId)
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    else if (!open && isAdmin) setOpen(true);
  }, [
    channelId,
    isChannelsLoading,
    isWorkspaceLoading,
    router,
    workspace,
    open,
    setOpen,
    workspaceId,
    isMemberLoading,
    member,
    isAdmin,
  ]);

  if (isWorkspaceLoading || isChannelsLoading || isMemberLoading) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-2 bg-white">
        <LoaderIcon className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="items-cent flex h-full flex-1 flex-col gap-y-2 bg-white">
        <TriangleAlertIcon className="size-6 text-red-500" />
        <span className="bg-muted-foreground text-sm">Workspace not found</span>
      </div>
    );
  }

  return (
    <div className="items-cent flex h-full flex-1 flex-col gap-y-2 bg-white">
      <TriangleAlertIcon className="size-6 text-red-500" />
      <span className="bg-muted-foreground text-sm">No channel found</span>
    </div>
  );
};

export default Workspace;
