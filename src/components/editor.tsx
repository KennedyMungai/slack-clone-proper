"use client";

import { Button } from "@/components/ui/button";
import { ImageIcon, SmileIcon } from "lucide-react";
import Quill, { type QuillOptions } from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";
import { PiTextAa } from "react-icons/pi";
import { MdSend } from "react-icons/md";
import Hint from "./hint";

const Editor = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div"),
    );

    const options: QuillOptions = {
      theme: "snow",
    };

    new Quill(editorContainer, options);

    return () => {
      if (container) container.innerHTML = "";
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col overflow-hidden rounded-md border border-slate-200 bg-white transition focus-within:border-slate-300 focus-within:shadow-sm">
        <div ref={containerRef} className="ql-custom h-full" />
        <div className="z-[5] flex px-2 pb-2">
          <Hint label="Hide formatting">
            <Button
              size="iconSm"
              disabled={false}
              variant={"ghost"}
              onClick={() => {}}
            >
              <PiTextAa className="size-4" />
            </Button>
          </Hint>
          <Hint label="Emoji">
            <Button
              size="iconSm"
              disabled={false}
              variant={"ghost"}
              onClick={() => {}}
            >
              <SmileIcon className="size-4" />
            </Button>
          </Hint>
          <Hint label="Image">
            <Button
              size="iconSm"
              disabled={false}
              variant={"ghost"}
              onClick={() => {}}
            >
              <ImageIcon className="size-4" />
            </Button>
          </Hint>

          <Button
            className="ml-auto bg-[#007a5a] text-white hover:bg-[#007a5a]/80"
            size={"iconSm"}
            disabled={false}
            onClick={() => {}}
          >
            <MdSend className="size-4" />
          </Button>
        </div>
      </div>
      <div className="flex justify-end p-2 text-[10px] text-muted-foreground">
        <p>
          <strong>Shift + Return</strong> to add a new line
        </p>
      </div>
    </div>
  );
};

export default Editor;
