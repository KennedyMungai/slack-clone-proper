"use client";

import { useGetMember } from "@/features/members/api/use-get-member";
import { useGetMessages } from "@/features/messages/api/use-get-messages";
import { useMemberId } from "@/hooks/use-member-id";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import { useChannelId } from "@/hooks/use-channel-id";
import { LoaderIcon } from "lucide-react";
import Header from "./header";

type Props = {
  id: Id<"conversations">;
};

const Conversation = ({ id }: Props) => {
  const memberId = useMemberId();
  const channelId = useChannelId();

  const { data: member, isLoading: isMemberLoading } = useGetMember({
    id: memberId,
  });

  const { results, status, loadMore } = useGetMessages({ conversationId: id });

  if (isMemberLoading || status === "LoadingFirstPage") {
    return (
      <div className="flex h-full items-center justify-center">
        <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <Header
        memberImage={member?.user.image}
        memberName={member?.user.name}
        onClick={() => {}}
      />
    </div>
  );
};

export default Conversation;
