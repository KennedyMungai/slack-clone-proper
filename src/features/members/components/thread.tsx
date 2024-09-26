"use client";

import { Button } from "@/components/ui/button";
import { useGetMessage } from "@/features/messages/api/use-get-message";
import { LoaderIcon, TriangleAlertIcon, XIcon } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";

type Props = {
  messageId: Id<"messages">;
  onClose: () => void;
};

const Thread = ({ messageId, onClose }: Props) => {
  const { data: message, isLoading: isLoadingMessage } = useGetMessage({
    id: messageId,
  });

  if (isLoadingMessage) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
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
      <div className="flex h-full flex-col items-center justify-center gap-y-2">
        <TriangleAlertIcon className="size-5 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground">Message not found</p>
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
    </div>
  );
};

export default Thread;
