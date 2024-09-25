import { Doc, Id } from "../../convex/_generated/dataModel";

type Props = {
  id: Id<"messages">;
  memberId: Id<"members">;
  authorImage: string;
  authorName: string;
  isAuthor: boolean;
  reactions: Doc<"reactions">;
  body: string;
  image: string;
  updatedAt: number;
  createdAt: number;
  isEditing: boolean;
  setEditing: () => void;
  isCompact: boolean;
  hideThreadButton: boolean;
  threadCount: number;
  threadImage?: string;
  threadTimestamp: number;
};

const Message = ({
  authorImage,
  authorName,
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
  return <div>Message</div>;
};

export default Message;
