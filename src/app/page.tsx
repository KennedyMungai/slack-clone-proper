"use client";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const HomePage = () => {
  const { data, isLoading } = useGetWorkspaces();

  const router = useRouter();

  const [open, setOpen] = useCreateWorkspaceModal();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) router.replace(`/workspace/${workspaceId}`);
    else if (!open) setOpen(true);
  }, [isLoading, workspaceId, open, setOpen, router]);

  return <main className="h-full"></main>;
};

export default HomePage;
