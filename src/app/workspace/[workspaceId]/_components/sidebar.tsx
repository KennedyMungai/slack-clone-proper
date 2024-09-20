"use client";

import { ModeToggle } from "@/components/mode-toggle";
import UserButton from "@/features/auth/components/user-button";
import {
  BellIcon,
  HomeIcon,
  MessagesSquareIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import SidebarButton from "./sidebar-button";
import WorkspaceSwitcher from "./workspace-switcher";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[70px] flex-col items-center gap-y-4 bg-[#481349] pb-4 pt-[9px]">
      <WorkspaceSwitcher />
      <SidebarButton
        icon={HomeIcon}
        label="Home"
        isActive={pathname.includes("/workspace")}
      />
      <SidebarButton icon={MessagesSquareIcon} label="DMs" />
      <SidebarButton icon={BellIcon} label="Notifications" />
      <SidebarButton icon={MoreHorizontalIcon} label="More" />
      <div className="mt-auto flex flex-col items-center justify-center gap-y-1 space-y-4">
        <UserButton />
        <ModeToggle />
      </div>
    </aside>
  );
};

export default Sidebar;
