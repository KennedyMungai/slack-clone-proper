import { Doc, Id } from "../../convex/_generated/dataModel";

type Props = {
  data: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
  onReactionChange: (value: string) => void;
};

const Reactions = ({ onReactionChange, data }: Props) => {
  return <div>Reactions</div>;
};

export default Reactions;
