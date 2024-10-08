import { Button } from "@/components/ui/button";
import {
  MessageSquareTextIcon,
  PencilIcon,
  SmileIcon,
  TrashIcon,
} from "lucide-react";
import Hint from "./hint";
import EmojiPopover from "@/components/emoji-popover";

type Props = {
  isAuthor: boolean;
  isPending: boolean;
  handleEdit: () => void;
  handleThread: () => void;
  handleDelete: () => void;
  handleReaction: (value: string) => void;
  hideThreadButton?: boolean;
};

const Toolbar = ({
  handleDelete,
  handleEdit,
  handleThread,
  hideThreadButton,
  isAuthor,
  isPending,
  handleReaction,
}: Props) => {
  return (
    <div className="absolute right-5 top-0">
      <div className="rounded-md border bg-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
        <EmojiPopover
          hint="Add reaction"
          onEmojiSelect={(emoji) => handleReaction(emoji.native)}
        >
          <Button variant={"ghost"} size={"icon"} disabled={isPending}>
            <SmileIcon className="size-5" />
          </Button>
        </EmojiPopover>
        {!hideThreadButton && (
          <Hint label={"Reply in thread"}>
            <Button
              variant={"ghost"}
              size={"icon"}
              disabled={isPending}
              onClick={handleThread}
            >
              <MessageSquareTextIcon className="size-5" />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <Hint label={"Edit Message"}>
            <Button
              variant={"ghost"}
              size={"icon"}
              disabled={isPending}
              onClick={handleEdit}
            >
              <PencilIcon className="size-5" />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <Hint label={"Delete Message"}>
            <Button
              variant={"ghost"}
              size={"icon"}
              disabled={isPending}
              onClick={handleDelete}
            >
              <TrashIcon className="size-5" />
            </Button>
          </Hint>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
