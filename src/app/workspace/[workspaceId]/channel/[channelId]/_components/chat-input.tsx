"use client";

import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef } from "react";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

type Props = {
  placeholder: string;
};

const ChatInput = ({ placeholder }: Props) => {
  const editorRef = useRef<Quill | null>(null);

  const handleSubmit = ({
    body,
    image,
  }: {
    body: string;
    image: File | null;
  }) => console.log({ body, image });

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
