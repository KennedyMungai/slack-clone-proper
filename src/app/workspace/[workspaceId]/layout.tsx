import { ReactNode } from "react";
import Toolbar from "./_components/toolbar";
import Sidebar from "./_components/sidebar";

type Props = {
  children: ReactNode;
};

const WorkspaceLayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)] overflow-x-hidden">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default WorkspaceLayout;
