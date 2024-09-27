"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetMember } from "@/features/members/api/use-get-member";
import { useRemoveMember } from "@/features/members/api/use-remove-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  ChevronDownIcon,
  LoaderIcon,
  MailIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";

type Props = {
  memberId: Id<"members">;
  onClose: () => void;
};

const Profile = ({ memberId, onClose }: Props) => {
  const workspaceId = useWorkspaceId();

  const { data: currentMember, isLoading: isLoadingCurrentMember } =
    useCurrentMember({
      workspaceId,
    });

  const { data: member, isLoading: isLoadingMember } = useGetMember({
    id: memberId,
  });

  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember();
  const { mutate: removeMember, isPending: isRemovingMember } =
    useRemoveMember();

  if (isLoadingMember || isLoadingCurrentMember) {
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

  const onRemove = () => {
    removeMember(
      { id: memberId },
      {
        onSuccess: () => {
          toast.success("Member removed");
          onClose();
        },
        onError: () => toast.error("Failed to remove member"),
      },
    );
  };

  const onLeave = () => {
    removeMember(
      { id: memberId },
      {
        onSuccess: () => {
          toast.success("You left the workspace");
          onClose();
        },
        onError: () => toast.error("Failed to leave the workspace"),
      },
    );
  };

  const onUpdate = (role: "admin" | "member") => {
    updateMember(
      { id: memberId, role },
      {
        onSuccess: () => {
          toast.success("Role changed");
          onClose();
        },
        onError: () => toast.error("Failed to change role"),
      },
    );
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-[49px] items-center justify-between border-b px-4">
        <p className="text-lg font-bold">Profile</p>
        <Button onClick={onClose} size={"iconSm"} variant={"ghost"}>
          <XIcon className="size-5 stroke-[1.5]" />
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <Avatar className="size-28">
          <AvatarImage src={member!.user.image} />
          <AvatarFallback className="text-2xl">
            {member!.user.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col p-4">
        <p className="text-xl font-bold">{member!.user.name!}</p>
        {currentMember?.role === "admin" &&
        currentMember._id !== member?._id ? (
          <div className="mt-4 flex items-center gap-2">
            <Button variant={"outline"} className="w-full capitalize">
              {member?.role} <ChevronDownIcon className="ml-2 size-4" />
            </Button>
            <Button className="w-full" variant={"outline"}>
              Remove
            </Button>
          </div>
        ) : currentMember?._id === member?._id &&
          currentMember?.role !== "admin" ? (
          <div className="mt-4">
            <Button variant="outline" className="w-full">
              Leave
            </Button>
          </div>
        ) : null}
      </div>
      <Separator />
      <div className="flex flex-col p-4">
        <p className="mb-4 text-sm font-bold">Contact Information</p>
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-md bg-muted">
            <MailIcon className="size-4" />
          </div>
          <div className="flex flex-col">
            <p className="text-[13px] font-semibold text-muted-foreground">
              Email Address
            </p>
            <Link
              href={`mailto:${member!.user.email}`}
              className="text-sm text-[#1264a3] hover:underline"
            >
              {member!.user.email}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
