"use client";

import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  AlertTriangleIcon,
  LoaderIcon,
  MessageSquareTextIcon,
  SendHorizontalIcon,
} from "lucide-react";
import SidebarItem from "./sidebar-item";
import WorkspaceHeader from "./workspace-header";

const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();

  const { data: member, isLoading: isMemberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: isWorkspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });

  if (isWorkspaceLoading || isMemberLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-[#5E2C5F]">
        <LoaderIcon className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-y-2 bg-[#5E2C5F]">
        <AlertTriangleIcon className="size-5 text-white" />
        <p className="text-sm text-white">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-y-2 bg-[#5E2C5F]">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
      <div className="mt-3 flex flex-col px-2">
        <SidebarItem
          label="Threads"
          icon={MessageSquareTextIcon}
          id="threads"
        />
        <SidebarItem
          label="Drafts & Sent"
          icon={SendHorizontalIcon}
          id="drafts"
        />
      </div>
    </div>
  );
};

export default WorkspaceSidebar;
