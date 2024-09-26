"use client";

import Hint from "@/components/hint";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { Doc, Id } from "../../convex/_generated/dataModel";

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
        <Hint
          label={`${reaction.count} ${reaction.count === 1 ? "person" : "people"} reacted with ${reaction.value}`}
          key={reaction._id}
        >
          <button
            className={cn(
              "flex h-6 items-center gap-x-1 rounded-full border border-transparent bg-slate-200/70 p-2 text-slate-800",
              reaction.memberIds.includes(currentMemberId) &&
                "border-blue-500 bg-blue-100/70 text-white",
            )}
            onClick={() => onChange(reaction.value)}
          >
            {reaction.value}
            <span
              className={cn(
                "text-xs font-semibold text-muted-foreground",
                reaction.memberIds.includes(currentMemberId) && "text-blue-500",
              )}
            >
              {reaction.count}
            </span>
          </button>
        </Hint>
      ))}
    </div>
  );
};

export default Reactions;
