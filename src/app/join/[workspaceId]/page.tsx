"use client";

import { Button } from "@/components/ui/button";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import Image from "next/image";
import Link from "next/link";
import VerificationInput from "react-verification-input";
import { Id } from "../../../../convex/_generated/dataModel";

type Props = {
  params: { workspaceId: string };
};

const JoinPage = ({ params: { workspaceId } }: Props) => {
  const { data, isLoading } = useGetWorkspaceInfo({
    id: workspaceId as Id<"workspaces">,
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-white">
        <Image
          src="/logo.svg"
          width={200}
          height={200}
          alt="Logo"
          className="animate-pulse"
        />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-8 rounded-lg bg-white p-8 shadow-sm">
      <Image src="/logo.svg" width={60} height={60} alt="Logo" />
      <div className="flex max-w-md flex-col items-center justify-center gap-y-4">
        <div className="flex flex-col items-center justify-center gap-y-2">
          <h1 className="text-2xl font-bold">Join {data?.name}</h1>
          <p className="text-md text-muted-foreground">
            Enter the workspace code to join
          </p>
        </div>
        <VerificationInput
          classNames={{
            container: "flex gap-x-2",
            character:
              "uppercase h-auto rounded-md border border-gray-30 flex items-center justify-center text-lg font-medium text-gray-500",
            characterInactive: "bg-muted",
            characterSelected: "bg-white text-black",
            characterFilled: "bg-white text-black",
          }}
          autoFocus
          length={6}
        />
      </div>
      <div className="flex gap-x-4">
        <Button size="lg" variant={"outline"} asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default JoinPage;
