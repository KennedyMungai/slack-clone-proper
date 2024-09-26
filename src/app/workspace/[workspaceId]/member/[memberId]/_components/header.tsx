"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";

type Props = {
  memberName?: string;
  memberImage?: string;
  onClick: () => void;
};

const Header = ({ onClick, memberImage, memberName }: Props) => {
  return (
    <div className="flex h-[49px] items-center overflow-hidden border-b bg-white px-4">
      <Button
        variant={"ghost"}
        size="sm"
        onClick={onClick}
        className="w-auto overflow-hidden px-2 text-lg font-semibold"
      >
        <Avatar className="size-6 rounded-md">
          <AvatarImage src={memberImage} alt={memberName} />
          <AvatarFallback>{memberName?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </Button>
      <span className="truncate">{memberName}</span>
      <ChevronDownIcon className="ml-2 size-2.5" />
    </div>
  );
};

export default Header;
