"use client";

import { useMemberId } from "@/hooks/use-member-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const MemberPage = () => {
  const workspaceId = useWorkspaceId();
  const memberId = useMemberId();

  return <div>{JSON.stringify({ workspaceId, memberId })}</div>;
};

export default MemberPage;
