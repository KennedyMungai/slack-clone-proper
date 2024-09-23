import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  name: string;
  joinCode: string;
};

const InviteModal = ({ open, setOpen, joinCode, name }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite people to {name}</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
