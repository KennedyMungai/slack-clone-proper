import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { Id } from "../../../../../convex/_generated/dataModel";

const userItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden py-6",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type Props = {
  id: Id<"members">;
  label?: string;
  image?: string;
  variant?: VariantProps<typeof userItemVariants>["variant"];
};

const UserItem = ({ id, label = "Member", image, variant }: Props) => {
  const workspaceId = useWorkspaceId();

  return (
    <Button
      variant={"transparent"}
      className={cn(userItemVariants({ variant }))}
      size={"sm"}
      asChild
    >
      <Link href={`/workspace/${workspaceId}/member/${id}`}>
        <Avatar className="mr-1 size-6 rounded-md">
          <AvatarImage className="rounded-md" src={image} alt={label} />
          <AvatarFallback className="rounded-md">
            {label.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="truncate text-sm">{label}</span>
      </Link>
    </Button>
  );
};

export default UserItem;
