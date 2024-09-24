"use client";

import { useCreateMessage } from "@/features/messages/api/use-create-message";
import { useChannelId } from "@/hooks/use-channel-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef } from "react";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

type Props = {
  placeholder: string;
};

const ChatInput = ({ placeholder }: Props) => {
  const editorRef = useRef<Quill | null>(null);

  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();

  const { mutate: createMessage } = useCreateMessage();

  const handleSubmit = ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => {
    createMessage({
      body,
      workspaceId,
      channelId,
    });
  };

  return (
    <div className="w-full px-5">
      <Editor
        onSubmit={handleSubmit}
        placeholder={placeholder}
        disabled={false}
        innerRef={editorRef}
      />
    </div>
  );
};

export default ChatInput;
