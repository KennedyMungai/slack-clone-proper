"use client";

import CreateChannelModal from "@/features/channels/components/create-channel-modal";
import CreateWorkspaceModal from "@/features/workspaces/components/create-workspace-modal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return;

  return (
    <>
      <CreateWorkspaceModal />
      <CreateChannelModal />
    </>
  );
};

export default ModalProvider;
