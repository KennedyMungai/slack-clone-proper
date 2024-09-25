import { GetMessagesReturnType } from "@/features/messages/api/use-get-messages";

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
  return (
    <div className="messages-scrollbar flex flex-1 flex-col-reverse overflow-y-auto pb-4">
      {data?.map((message) => (
        <div key={message._id}>{JSON.stringify(message)}</div>
      ))}
    </div>
  );
};

export default MessageList;
