"use client";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusCircleIcon } from "lucide-react";
import { ReactNode } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useToggle } from "react-use";

type Props = {
  children: ReactNode;
  label: string;
  hint: string;
  onNew?: () => void;
};

const WorkspaceSection = ({ children, hint, label, onNew }: Props) => {
  const [on, toggle] = useToggle(true);

  return (
    <div className="space-y-4">
      <div className="group flex items-center px-3.5">
        <Button
          variant={"transparent"}
          onClick={toggle}
          className="size-6 shrink-0 p-0.5 text-xs text-[#f9edffcc]"
        >
          <FaCaretDown
            className={cn(
              "size-4 transition-all",
              !on && "rotate-180 transition-all",
            )}
          />
        </Button>
        <Button
          variant={"transparent"}
          size="sm"
          className="group h-[28px] items-center justify-start overflow-hidden px-0.5 text-sm text-[#f9edffcc]"
        >
          <span className="truncate">{label}</span>
        </Button>
        {onNew && (
          <Hint label={hint} side="top" align="center">
            <Button
              onClick={onNew}
              variant={"transparent"}
              size="iconSm"
              className="ml-auto size-6 shrink-0 p-0.5 text-sm text-[#f9edffcc] opacity-0 transition-opacity group-hover:opacity-100"
            >
              <PlusCircleIcon className="size-5" />
            </Button>
          </Hint>
        )}
      </div>
      {on && children}
    </div>
  );
};

export default WorkspaceSection;
