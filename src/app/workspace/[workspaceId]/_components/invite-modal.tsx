import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  joinCode: string;
};

const InviteModal = ({ open, setOpen, joinCode, name }: Props) => {
  const workspaceId = useWorkspaceId();

  const handleCopy = () => {
    const inviteLink = window.location.origin + `/join/${workspaceId}`;

    navigator.clipboard
      .writeText(inviteLink)
      .then(() => toast.success("Invite link copied to clipboard"));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite people to {name}</DialogTitle>
          <DialogDescription>
            Use the code below to invite people to your workspace
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-y-4 py-10">
          <p className="text-center text-4xl font-bold uppercase tracking-widest">
            {joinCode}
          </p>
          <Button
            className="space-x-4"
            variant={"ghost"}
            size="sm"
            onClick={handleCopy}
          >
            <span>Copy link</span> <CopyIcon className="size-5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
