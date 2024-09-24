"use client";

import { Button } from "@/components/ui/button";
import { ImageIcon, SmileIcon } from "lucide-react";
import Quill, { type QuillOptions } from "quill";
import { Delta, Op } from "quill/core";
import "quill/dist/quill.snow.css";
import { MutableRefObject, useEffect, useLayoutEffect, useRef } from "react";
import { MdSend } from "react-icons/md";
import { PiTextAa } from "react-icons/pi";
import Hint from "./hint";

type EditorValue = {
  image: File | null;
  body: string;
};

type Props = {
  variant?: "create" | "update";
  onSubmit: ({ image, body }: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: MutableRefObject<Quill | null>;
};

const Editor = ({
  variant = "create",
  onSubmit,
  defaultValue = [],
  disabled = false,
  innerRef,
  onCancel,
  placeholder = "Write something...",
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef(onSubmit);
  const placeholderRef = useRef(placeholder);
  const quillRef = useRef<Quill | null>;
  const defaultValueRef = useRef(defaultValue);
  const disabledRef = useRef(disabled);

  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeholderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div"),
    );

    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeholderRef.current,
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
          {variant === "create" && (
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
          )}
          {variant === "update" && (
            <div className="ml-auto flex items-center gap-x-2">
              <Button
                variant={"outline"}
                size="sm"
                onClick={() => {}}
                disabled={false}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {}}
                disabled={false}
                className="bg-[#007a5a] text-white hover:bg-[#007a5a]/80"
              >
                Save
              </Button>
            </div>
          )}
          {variant === "create" && (
            <Button
              className="ml-auto bg-[#007a5a] text-white hover:bg-[#007a5a]/80"
              size={"iconSm"}
              disabled={false}
              onClick={() => {}}
            >
              <MdSend className="size-4" />
            </Button>
          )}
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
