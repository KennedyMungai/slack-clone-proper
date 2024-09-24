"use client";

import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef } from "react";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

const ChatInput = () => {
  const editorRef = useRef<Quill | null>(null);

  return (
    <div className="w-full px-5">
      <Editor
        variant="update"
        onSubmit={() => {}}
        placeholder="Test placeholder"
        disabled={false}
        innerRef={editorRef}
      />
    </div>
  );
};

export default ChatInput;
