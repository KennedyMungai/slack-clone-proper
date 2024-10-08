"use client";

import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

const sidebarItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden py-6",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type Props = {
  label: string;
  icon: LucideIcon | IconType;
  id: string;
  variant?: VariantProps<typeof sidebarItemVariants>["variant"];
};

const SidebarItem = ({ icon: Icon, id, label, variant }: Props) => {
  const workspaceId = useWorkspaceId();

  return (
    <Button
      asChild
      variant="transparent"
      size={"sm"}
      className={cn(sidebarItemVariants({ variant }))}
    >
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className="mr-2 size-5 shrink-0" />
        <span className="truncate text-sm">{label}</span>
      </Link>
    </Button>
  );
};

export default SidebarItem;
