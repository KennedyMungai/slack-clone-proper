import UserButton from "@/features/auth/components/user-button";
import WorkspaceSwitcher from "./workspace-switcher";
import { ModeToggle } from "@/components/mode-toggle";

const Sidebar = () => {
  return (
    <aside className="flex h-full w-[70px] flex-col items-center gap-y-4 bg-[#481349] pb-4 pt-[9px]">
      <WorkspaceSwitcher />
      <div className="mt-auto flex flex-col items-center justify-center gap-y-1 space-y-4">
        <UserButton />
        <ModeToggle />
      </div>
    </aside>
  );
};

export default Sidebar;
