"use client";

import { Button } from "@/components/ui/button";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { InfoIcon, SearchIcon } from "lucide-react";

const Toolbar = () => {
  const workspaceId = useWorkspaceId();

  const { data } = useGetWorkspace({ id: workspaceId });

  return (
    <nav className="flex h-10 items-center justify-between bg-[#481349] p-1.5">
      <div className="flex-1" />
      <div className="max-[642px] min-w-[280px] shrink grow-[2]">
        <Button
          size={"sm"}
          className="h-7 w-full justify-start bg-accent/25 px-2 hover:bg-accent/25"
        >
          <SearchIcon className="mr-2 size-4 text-white" />
          <span className="text-xs text-white">Search {data?.name}</span>
        </Button>
      </div>
      <div className="ml-auto flex flex-1 items-center justify-end">
        <Button variant={"transparent"} size={"iconSm"}>
          <InfoIcon className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};

export default Toolbar;
