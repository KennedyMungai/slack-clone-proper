"use client";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, ListFilterIcon, SquarePenIcon } from "lucide-react";
import { useState } from "react";
import { Doc } from "../../../../../convex/_generated/dataModel";
import PreferencesModal from "./preferences-modal";

type Props = {
  workspace: Doc<"workspaces">;
  isAdmin: boolean;
};

const WorkspaceHeader = ({ workspace, isAdmin }: Props) => {
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  return (
    <>
      <div className="flex h-[49px] items-center justify-between gap-0.5 px-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"transparent"}
              className="w-auto overflow-hidden p-1.5 text-lg font-semibold"
              size="sm"
            >
              <span className="truncate">{workspace.name}</span>
              <ChevronDownIcon className="ml-2 size-5 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="w-64">
            <DropdownMenuItem className="cursor-pointer capitalize">
              <div className="relative mr-2 flex size-9 items-center justify-center overflow-hidden rounded-md bg-[#616061] text-xl font-semibold text-white">
                {workspace.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col items-start">
                <p className="font-bold">{workspace.name}</p>
                <p className="text-xs text-muted-foreground">
                  Active Workspace
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {isAdmin && (
              <DropdownMenuItem
                className="cursor-pointer py-2"
                onClick={() => {}}
              >
                Invite People to {workspace.name}
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            {isAdmin && (
              <DropdownMenuItem
                className="cursor-pointer py-2"
                onClick={() => setPreferencesOpen(true)}
              >
                Preferences
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-0.5">
          <Hint label="Filter Conversations" side="bottom">
            <Button
              variant={"ghost"}
              size="icon"
              className="hover:bg-accent/50"
            >
              <ListFilterIcon className="size-5" />
            </Button>
          </Hint>
          <Hint label="New Message" side="bottom">
            <Button
              variant={"ghost"}
              size="icon"
              className="hover:bg-accent/50"
            >
              <SquarePenIcon className="size-5" />
            </Button>
          </Hint>
        </div>
      </div>
      <PreferencesModal
        open={preferencesOpen}
        setOpen={setPreferencesOpen}
        initialValue={workspace.name}
      />
    </>
  );
};

export default WorkspaceHeader;
