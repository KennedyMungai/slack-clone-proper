"use client";

import { useGetChannel } from "@/features/channels/api/use-get-channel";
import { useChannelId } from "@/hooks/use-channel-id";
import { LoaderIcon, TriangleAlertIcon } from "lucide-react";
import Header from "./_components/header";

const ChannelPage = () => {
  const channelId = useChannelId();

  const { data: channel, isLoading: isChannelLoading } = useGetChannel({
    id: channelId,
  });

  if (isChannelLoading) {
    return (
      <div className="flex h-full flex-1 items-center justify-center bg-white">
        <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-y-2 bg-white">
        <TriangleAlertIcon className="size-5 text-red-500" />
        <span className="text-sm text-muted-foreground">Channel not found</span>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <Header title={channel.name} />
    </div>
  );
};

export default ChannelPage;
