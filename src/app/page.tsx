"use client";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { LoaderIcon } from "lucide-react";
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
    else if (!open && !isLoading) setOpen(true);
  }, [isLoading, workspaceId, open, setOpen, router]);

  return (
    <main className="flex h-full items-center justify-center">
      <LoaderIcon className="size-10 animate-spin text-muted-foreground" />
    </main>
  );
};

export default HomePage;
