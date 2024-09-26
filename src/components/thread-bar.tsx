import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

type Props = {
  count?: number;
  image?: string;
  timestamp?: number;
  onClick: () => void;
};

const ThreadBar = ({ count, timestamp, image, onClick }: Props) => {
  if (!count || !timestamp) return null;

  return (
    <button
      onClick={onClick}
      className="group/thread-bar flex max-w-[600px] items-center justify-start rounded-md border border-transparent p-1 transition hover:border-border hover:bg-white"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Avatar className="shrink-0">
          <AvatarImage src={image} />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
        <span className="truncate text-xs font-bold text-sky-700 hover:underline">
          {count} {count > 1 ? "replies" : "reply"}
        </span>
        <span className="hidden truncate text-xs text-muted-foreground group-hover/thread-bar:block">
          Last reply {formatDistanceToNow(timestamp, { addSuffix: true })}
        </span>
      </div>
    </button>
  );
};

export default ThreadBar;
