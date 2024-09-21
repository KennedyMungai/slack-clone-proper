"use client";

import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

type Props = {
  label: string;
  icon: LucideIcon | IconType;
  id: string;
};

const SidebarItem = ({ icon: Icon, id, label }: Props) => {
  const workspaceId = useWorkspaceId();

  return (
    <Button asChild variant="transparent" size={"sm"}>
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className="mr-2 size-5" />
        <span className="text-base">{label}</span>
      </Link>
    </Button>
  );
};

export default SidebarItem;
