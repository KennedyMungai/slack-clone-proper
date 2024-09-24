import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

const ChatInput = () => {
  return (
    <div className="w-full px-5">
      <Editor variant="update" />
    </div>
  );
};

export default ChatInput;
