"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useAuthActions } from "@convex-dev/auth/react";
import { Loader2Icon, LogOutIcon } from "lucide-react";

const UserButton = () => {
  const { data, isLoading } = useCurrentUser();

  const { signOut } = useAuthActions();

  if (isLoading)
    return (
      <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
    );

  if (!data) return null;

  const { name, image } = data;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        <Avatar className="size-6 transition hover:opacity-75">
          <AvatarImage src={image} alt={name} className="" />
          <AvatarFallback className="size-6 text-xl text-black">
            {name!.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem className="h-10" onClick={() => signOut()}>
          <LogOutIcon className="mr-2 size-4 p-2" /> Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
