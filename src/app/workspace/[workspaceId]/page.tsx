"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";

const Workspace = () => {
  const workspaceId = useWorkspaceId();

  return <div>{workspaceId}</div>;
};

export default Workspace;
