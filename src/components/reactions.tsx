import { Doc, Id } from "../../convex/_generated/dataModel";

type Props = {
  reactions: Array<
    Omit<
      Doc<"reactions">,
      "memberId" & {
        count: number;
        memberIds: Id<"members">[];
      }
    >
  >;
  onReactionChange: (value: string) => void;
};

const Reactions = ({ onReactionChange, reactions }: Props) => {
  return <div>Reactions</div>;
};

export default Reactions;
