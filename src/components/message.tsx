import dynamic from "next/dynamic";
import { Doc, Id } from "../../convex/_generated/dataModel";

const Renderer = dynamic(() => import("@/components/renderer"), { ssr: false });

type Props = {
  id: Id<"messages">;
  memberId: Id<"members">;
  authorImage?: string;
  authorName?: string;
  isAuthor: boolean;
  reactions: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
  body: Doc<"messages">["body"];
  image: string | null | undefined;
  updatedAt: Doc<"messages">["updatedAt"];
  createdAt: Doc<"messages">["_creationTime"];
  isEditing: boolean;
  setEditing: (id: Id<"messages"> | null) => void;
  isCompact?: boolean;
  hideThreadButton?: boolean;
  threadCount?: number;
  threadImage?: string;
  threadTimestamp?: number;
};

const Message = ({
  authorImage,
  authorName = "Member",
  body,
  createdAt,
  hideThreadButton,
  id,
  image,
  isAuthor,
  isCompact,
  isEditing,
  memberId,
  reactions,
  setEditing,
  threadCount,
  threadTimestamp,
  updatedAt,
  threadImage,
}: Props) => {
  return <Renderer value={body} />;
};

export default Message;
