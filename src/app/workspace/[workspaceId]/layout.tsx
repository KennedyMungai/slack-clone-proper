"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Profile from "@/features/members/components/profile";
import Thread from "@/features/members/components/thread";
import { usePanel } from "@/hooks/use-panel";
import { LoaderIcon } from "lucide-react";
import { ReactNode } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import Sidebar from "./_components/sidebar";
import Toolbar from "./_components/toolbar";
import WorkspaceSidebar from "./_components/workspace-sidebar";

type Props = {
  children: ReactNode;
};

const WorkspaceLayout = ({ children }: Props) => {
  const { onClose, parentMessageId, profileMemberId } = usePanel();

  const showPanel = !!parentMessageId || !!profileMemberId;

  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)] overflow-x-hidden">
        <Sidebar />
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId={"slack-clone-workspace-layout"}
        >
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            maxSize={25}
            className="bg-[#5E2C5F]"
          >
            <WorkspaceSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20} defaultSize={70}>
            {children}
          </ResizablePanel>
          {showPanel && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={20} defaultSize={29}>
                {parentMessageId ? (
                  <Thread
                    messageId={parentMessageId as Id<"messages">}
                    onClose={onClose}
                  />
                ) : profileMemberId ? (
                  <Profile
                    memberId={profileMemberId as Id<"members">}
                    onClose={onClose}
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
                  </div>
                )}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkspaceLayout;
