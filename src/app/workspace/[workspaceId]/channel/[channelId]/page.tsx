"use client";

import { useGetChannel } from "@/features/channels/api/use-get-channel";
import { useChannelId } from "@/hooks/use-channel-id";
import { LoaderIcon, TriangleAlertIcon } from "lucide-react";
import ChatInput from "./_components/chat-input";
import Header from "./_components/header";
import { useGetMessages } from "@/features/messages/api/use-get-messages";
import MessageList from "@/components/message-list";

const ChannelPage = () => {
  const channelId = useChannelId();

  const { results, status, loadMore } = useGetMessages({ channelId });
  const { data: channel, isLoading: isChannelLoading } = useGetChannel({
    id: channelId,
  });


  if (isChannelLoading || status === "LoadingFirstPage") {
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
      <MessageList
        channelName={channel.name}
        channelCreationTime={channel._creationTime}
        data={results}
        loadMore={loadMore}
        isLoadingMore={status === "LoadingMore"}
        canLoadMore={status === "CanLoadMore"}
      />
      <ChatInput placeholder={`Message #${channel.name}`} />
    </div>
  );
};

export default ChannelPage;
