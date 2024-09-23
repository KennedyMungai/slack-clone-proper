"use client";

import { useParams } from "next/navigation";

const JoinPage = () => {
  const params = useParams();

  const { workspaceId } = params as { workspaceId: string };

  return <div>{workspaceId}</div>;
};

export default JoinPage;
