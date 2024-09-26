"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { cn } from "@/lib/utils";

type Props = {
  data: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
  onChange: (value: string) => void;
};

const Reactions = ({ onChange, data }: Props) => {
  const workspaceId = useWorkspaceId();

  const { data: currentMember } = useCurrentMember({ workspaceId });

  const currentMemberId = currentMember?._id;

  if (data.length === 0 || !currentMemberId) return null;

  return (
    <div className="my-1 flex items-center gap-1">
      {data.map((reaction) => (
        <button
          key={reaction._id}
          className={cn(
            "flex h-6 items-center gap-x-1 rounded-full border border-transparent bg-slate-200/70 p-2 text-slate-800",
            reaction.memberIds.includes(currentMemberId) &&
              "border-blue-500 bg-blue-100/70 text-blue-500",
          )}
        >
          {reaction.value}
          <span>{reaction.count}</span>
        </button>
      ))}
    </div>
  );
};

export default Reactions;
