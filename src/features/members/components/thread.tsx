"use client";

import Message from "@/components/message";
import { Button } from "@/components/ui/button";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetMessage } from "@/features/messages/api/use-get-message";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { LoaderIcon, TriangleAlertIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

type Props = {
  messageId: Id<"messages">;
  onClose: () => void;
};

const Thread = ({ messageId, onClose }: Props) => {
  const workspaceId = useWorkspaceId();

  const [editingId, setEditingId] = useState<Id<"messages"> | null>(null);

  const { data: message, isLoading: isLoadingMessage } = useGetMessage({
    id: messageId,
  });

  const { data: currentMember, isLoading: isLoadingCurrentMember } =
    useCurrentMember({ workspaceId });

  if (isLoadingMessage || isLoadingCurrentMember) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex h-[49px] items-center justify-between border-b px-4">
          <p className="text-lg font-bold">Thread</p>
          <Button onClick={onClose} size={"iconSm"} variant={"ghost"}>
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex h-full items-center justify-center">
          <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!message) {
    <div className="flex h-full flex-col">
      <div className="flex h-[49px] items-center justify-between border-b px-4">
        <p className="text-lg font-bold">Thread</p>
        <Button onClick={onClose} size={"iconSm"} variant={"ghost"}>
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>
      <div className="flex h-full flex-col items-center justify-center">
        <TriangleAlertIcon className="size-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Message not found</p>
      </div>
    </div>;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-[49px] items-center justify-between border-b px-4">
        <p className="text-lg font-bold">Thread</p>
        <Button onClick={onClose} size={"iconSm"} variant={"ghost"}>
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>
      <div>
        <Message
          hideThreadButton
          memberId={message!.memberId}
          authorImage={message!.user.image}
          authorName={message!.user.name}
          isAuthor={message!.memberId === currentMember?._id}
          body={message!.body}
          image={message!.image}
          createdAt={message!._creationTime}
          updatedAt={message?.updatedAt}
          id={message!._id}
          reactions={message!.reactions}
          isEditing={editingId === message!._id}
          setEditingId={setEditingId}
        />
      </div>
      <div className="px-4">
        <Editor onSubmit={() => {}} disabled={false} placeholder="Reply...." />
      </div>
    </div>
  );
};

export default Thread;
