"use client";

import ChannelHero from "@/components/channel-hero";
import Message from "@/components/message";
import { GetMessagesReturnType } from "@/features/messages/api/use-get-messages";
import { differenceInMinutes, format, isToday, isYesterday } from "date-fns";
import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useCurrentMember } from "@/features/members/api/use-current-member";

type Props = {
  channelName?: string;
  channelCreationTime?: number;
  data: GetMessagesReturnType | undefined;
  loadMore: () => void;
  isLoadingMore: boolean;
  canLoadMore: boolean;
  memberName?: string;
  memberImage?: string;
  variant?: "channel" | "thread" | "conversation";
};

const TIME_THRESHOLD = 5;

const formatDateLabel = (dateStr: string) => {
  const date = new Date(dateStr);

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";

  return format(date, "EEEE, MMMM d");
};

const MessageList = ({
  canLoadMore,
  channelCreationTime,
  channelName,
  data,
  isLoadingMore,
  loadMore,
  memberImage,
  memberName,
  variant = "channel",
}: Props) => {
  const [editingId, setEditingId] = useState<Id<"messages"> | null>(null);

  const workspaceId = useWorkspaceId();
  const { data: currentMember } = useCurrentMember({ workspaceId });

  const groupedMessages = data?.reduce(
    (groups, message) => {
      const date = new Date(message._creationTime);
      const dateKey = format(date, "yyyy-MM-dd");

      if (!groups[dateKey]) groups[dateKey] = [];

      groups[dateKey].unshift(message);

      return groups;
    },
    {} as Record<string, typeof data>,
  );

  return (
    <div className="messages-scrollbar flex flex-1 flex-col-reverse overflow-y-auto pb-4">
      {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
        <div key={dateKey}>
          <div className="relative my-2 text-center">
            <hr className="absolute left-0 right-0 top-1/2 border-t border-gray-300" />
            <span className="relative inline-block rounded-full border border-gray-300 bg-white px-4 py-1 text-xs shadow-sm">
              {formatDateLabel(dateKey)}
            </span>
          </div>
          {messages.map((message, index) => {
            const prevMessage = messages[index - 1];
            const isCompact =
              prevMessage &&
              prevMessage.user._id === message.user._id &&
              differenceInMinutes(
                new Date(message._creationTime),
                new Date(prevMessage._creationTime),
              ) < TIME_THRESHOLD;

            return (
              <Message
                key={message._id}
                id={message._id}
                memberId={message.memberId}
                authorImage={message.user.image}
                authorName={message.user.name}
                isAuthor={message.memberId === currentMember?._id}
                reactions={message.reactions}
                body={message.body}
                image={message.image}
                updatedAt={message.updatedAt}
                createdAt={message._creationTime}
                isEditing={editingId === message._id}
                setEditing={setEditingId}
                isCompact={isCompact}
                hideThreadButton={variant === "thread"}
                threadCount={message.threadCount}
                threadImage={message.threadImage}
                threadTimestamp={message.threadTimestamp}
              />
            );
          })}
        </div>
      ))}
      {variant === "channel" && channelName && channelCreationTime && (
        <ChannelHero name={channelName} creationTime={channelCreationTime} />
      )}
    </div>
  );
};

export default MessageList;
