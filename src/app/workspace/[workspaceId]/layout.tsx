import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ReactNode } from "react";
import Sidebar from "./_components/sidebar";
import Toolbar from "./_components/toolbar";
import WorkspaceSidebar from "./_components/workspace-sidebar";

type Props = {
  children: ReactNode;
};

const WorkspaceLayout = ({ children }: Props) => {
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
          <ResizablePanel minSize={20}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkspaceLayout;
