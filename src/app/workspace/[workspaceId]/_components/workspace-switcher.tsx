"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { LoaderIcon, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Doc } from "../../../../../convex/_generated/dataModel";

const WorkspaceSwitcher = () => {
  const router = useRouter();

  const workspaceId = useWorkspaceId();

  const [_, setOpen] = useCreateWorkspaceModal();

  const { data: workspace, isLoading: isWorkspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: workspaces, isLoading: isWorkspacesLoading } =
    useGetWorkspaces();

  const filteredWorkspaces = workspaces?.filter(
    (workspace) => workspace?._id !== workspaceId,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative size-9 overflow-hidden bg-[#ABABAD] text-xl font-semibold text-slate-800 hover:bg-[#ABABAD]/80">
          {isWorkspaceLoading ? (
            <LoaderIcon className="size-5 shrink-0 animate-spin" />
          ) : (
            workspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
          className="cursor-pointer flex-col items-start justify-start break-words capitalize"
          onClick={() => router.push(`/workspace/${workspaceId}`)}
        >
          {workspace?.name}
          <span className="text-xs text-muted-foreground">
            Active Workspace
          </span>
        </DropdownMenuItem>
        {filteredWorkspaces?.map((workspace: Doc<"workspaces">) => (
          <DropdownMenuItem
            key={workspace._id}
            onClick={() => router.push(`/workspace/${workspace._id}`)}
            className="cursor-pointer break-words p-2 capitalize"
          >
            {workspace.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className="relative mr-2 flex size-9 items-center justify-center overflow-hidden rounded-md text-xl font-semibold text-slate-800">
            <PlusCircleIcon className="mr-2 size-5" />
          </div>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceSwitcher;
