/* eslint-disable @next/next/no-img-element */
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Props = {
  url: string | null | undefined;
};

const Thumbnail = ({ url }: Props) => {
  if (!url) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative my-2 max-w-[360px] cursor-zoom-in overflow-hidden rounded-lg border">
          <img
            src={url}
            alt="Message Image"
            className="size-full rounded-md object-cover"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] border-none bg-transparent p-0 shadow-none">
        <img
          src={url}
          alt="Message Image"
          className="size-full rounded-md object-cover"
        />
      </DialogContent>
    </Dialog>
  );
};

export default Thumbnail;
