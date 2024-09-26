"use client";

import Hint from "@/components/hint";
import Reactions from "@/components/reactions";
import ThreadBar from "@/components/thread-bar";
import Thumbnail from "@/components/thumbnail";
import Toolbar from "@/components/toolbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRemoveMessage } from "@/features/messages/api/use-remove-message";
import { useUpdateMessage } from "@/features/messages/api/use-update-message";
import { useToggleReaction } from "@/features/reactions/api/use-toggle-reaction";
import useConfirm from "@/hooks/use-confirm";
import { usePanel } from "@/hooks/use-panel";
import { cn } from "@/lib/utils";
import { format, isToday, isYesterday } from "date-fns";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { Doc, Id } from "../../convex/_generated/dataModel";

const Renderer = dynamic(() => import("@/components/renderer"), { ssr: false });
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

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
  setEditingId: (id: Id<"messages"> | null) => void;
  isCompact?: boolean;
  hideThreadButton?: boolean;
  threadCount?: number;
  threadImage?: string;
  threadTimestamp?: number;
};

const formatFullTime = (date: Date) =>
  `${isToday(date) ? "Today" : isYesterday(date) ? "Yesterday" : format(date, "MMM d, yyyy")} at ${format(date, "h:mm:ss a")}`;

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
  setEditingId,
  threadCount,
  threadTimestamp,
  updatedAt,
  threadImage,
}: Props) => {
  const { onOpenMessage, onClose, parentMessageId } = usePanel();

  const { mutate: updateMessage, isPending: isUpdatingMessage } =
    useUpdateMessage();

  const { mutate: removeMessage, isPending: isRemovingMessage } =
    useRemoveMessage();

  const { mutate: toggleReaction, isPending: isTogglingReaction } =
    useToggleReaction();

  const isPending =
    isUpdatingMessage || isRemovingMessage || isTogglingReaction;

  const [ConfirmDialog, confirm] = useConfirm({
    title: "Are you sure?",
    message: "Deleting a message cannot be undone",
  });

  const handleUpdate = ({ body }: { body: string }) => {
    updateMessage(
      { id, body },
      {
        onSuccess: () => {
          toast.success("Message updated");
          setEditingId(null);
        },
        onError: () => toast.error("Failed to update message"),
      },
    );
  };

  const handleRemove = async () => {
    const ok = await confirm();

    if (!ok) return;

    removeMessage(
      { id },
      {
        onSuccess: () => {
          toast.success("Message deleted");

          if (parentMessageId === id) onClose();
        },
        onError: () => toast.error("Failed to delete message"),
      },
    );
  };

  const handleReaction = (value: string) =>
    toggleReaction(
      { messageId: id, value },
      { onError: () => toast.error("Failed to toggle reaction") },
    );

  if (isCompact) {
    return (
      <>
        <div
          className={cn(
            "group relative flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60",
            isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433]",
            isRemovingMessage &&
              "origin-bottom scale-y-0 transform bg-rose-500/50 transition-all duration-200",
          )}
        >
          <div className="ml-2 flex items-start gap-2">
            <Hint label={formatFullTime(new Date(createdAt))}>
              <button className="w-[40px] text-center text-xs leading-[22px] text-muted-foreground opacity-0 hover:underline group-hover:opacity-100">
                {format(new Date(createdAt), "hh:mm")}
              </button>
            </Hint>
            {isEditing ? (
              <div className="size-full">
                <Editor
                  variant="update"
                  onSubmit={handleUpdate}
                  disabled={isPending}
                  defaultValue={JSON.parse(body)}
                  onCancel={() => setEditingId(null)}
                />
              </div>
            ) : (
              <div className="flex w-full flex-col">
                <Renderer value={body} />
                <Thumbnail url={image} />
                {updatedAt ? (
                  <span className="text-xs text-muted-foreground">
                    (edited)
                  </span>
                ) : null}
                <Reactions data={reactions} onChange={handleReaction} />
                <ThreadBar
                  count={threadCount}
                  image={threadImage}
                  timestamp={threadTimestamp}
                />
              </div>
            )}
          </div>
          {!isEditing && (
            <Toolbar
              isAuthor={isAuthor}
              isPending={false}
              handleEdit={() => setEditingId(id)}
              handleThread={() => onOpenMessage(id)}
              handleDelete={handleRemove}
              handleReaction={handleReaction}
              hideThreadButton={hideThreadButton}
            />
          )}
        </div>
        <ConfirmDialog />
      </>
    );
  }

  return (
    <>
      <div
        className={cn(
          "group relative flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60",
          isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433]",
          isRemovingMessage &&
            "origin-bottom scale-y-0 transform bg-rose-500/50 transition-all duration-200",
        )}
      >
        <div className="flex items-start gap-2">
          <button>
            <Avatar className="mr-1">
              <AvatarImage src={authorImage} alt={authorName} />
              <AvatarFallback className="bg-sky-500 text-xs text-white">
                {authorName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </button>
          {isEditing ? (
            <div className="size-full">
              <Editor
                variant="update"
                onSubmit={handleUpdate}
                disabled={isPending}
                defaultValue={JSON.parse(body)}
                onCancel={() => setEditingId(null)}
              />
            </div>
          ) : (
            <div className="flex w-full flex-col overflow-hidden">
              <div className="text-sm">
                <button
                  className="font-bold text-primary hover:underline"
                  onClick={() => {}}
                >
                  {authorName}
                </button>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <Hint label={formatFullTime(new Date(createdAt))}>
                  <button className="text-xs text-muted-foreground hover:underline">
                    {format(new Date(createdAt), "h:mm a")}
                  </button>
                </Hint>
              </div>
              <Renderer value={body} />
              <Thumbnail url={image} />
              {updatedAt ? (
                <span className="text-xs text-muted-foreground">(edited)</span>
              ) : null}
              <Reactions data={reactions} onChange={handleReaction} />
              <ThreadBar
                count={threadCount}
                image={threadImage}
                timestamp={threadTimestamp}
              />
            </div>
          )}
        </div>
        {!isEditing && (
          <Toolbar
            isAuthor={isAuthor}
            isPending={isPending}
            handleEdit={() => setEditingId(id)}
            handleThread={() => onOpenMessage(id)}
            handleDelete={handleRemove}
            handleReaction={handleReaction}
            hideThreadButton={hideThreadButton}
          />
        )}
      </div>
      <ConfirmDialog />
    </>
  );
};

export default Message;
