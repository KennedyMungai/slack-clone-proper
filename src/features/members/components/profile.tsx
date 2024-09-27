"use client";

import { Button } from "@/components/ui/button";
import { useGetMember } from "@/features/members/api/use-get-member";
import { LoaderIcon, TriangleAlertIcon, XIcon } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";

type Props = {
  memberId: Id<"members">;
  onClose: () => void;
};

const Profile = ({ memberId, onClose }: Props) => {
  const { data: member, isLoading: isLoadingMember } = useGetMember({
    id: memberId,
  });

  if (isLoadingMember) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex h-[49px] items-center justify-between border-b px-4">
          <p className="text-lg font-bold">Profile</p>
          <Button onClick={onClose} size={"iconSm"} variant={"ghost"}>
            <XIcon className="size-5 stroke-[1.5]" />
          </Button>
        </div>
        <div className="flex h-full items-center justify-center">
          <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!member) {
    <div className="flex h-full flex-col">
      <div className="flex h-[49px] items-center justify-between border-b px-4">
        <p className="text-lg font-bold">Profile</p>
        <Button onClick={onClose} size={"iconSm"} variant={"ghost"}>
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>
      <div className="flex h-full flex-col items-center justify-center">
        <TriangleAlertIcon className="size-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Profile not found</p>
      </div>
    </div>;
  }

  return (
    <div>
      <div className="flex h-[49px] items-center justify-between border-b px-4">
        <p className="text-lg font-bold">Profile</p>
        <Button onClick={onClose} size={"iconSm"} variant={"ghost"}>
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>
    </div>
  );
};

export default Profile;
