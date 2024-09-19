"use client";

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
    </>
  );
};

export default ModalProvider;
