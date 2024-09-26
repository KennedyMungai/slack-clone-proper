"use client";

import { useCreateOrGetConversation } from "@/features/conversations/api/use-create-or-get-conversation";
import { useMemberId } from "@/hooks/use-member-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { AlertTriangleIcon, LoaderIcon } from "lucide-react";
import { useEffect } from "react";

const MemberPage = () => {
  const workspaceId = useWorkspaceId();
  const memberId = useMemberId();

  const { data, mutate, isPending } = useCreateOrGetConversation();

  useEffect(() => {
    mutate({
      workspaceId,
      memberId,
    });
  }, [mutate, memberId, workspaceId]);

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-y-2">
        <AlertTriangleIcon className="size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Conversation not found
        </span>
      </div>
    );
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default MemberPage;
