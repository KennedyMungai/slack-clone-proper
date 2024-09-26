import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      </div>
    </button>
  );
};

export default ThreadBar;
