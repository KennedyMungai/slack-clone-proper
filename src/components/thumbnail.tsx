/* eslint-disable @next/next/no-img-element */
import { Dialog } from "@/components/ui/dialog";

type Props = {
  url: string | null | undefined;
};

const Thumbnail = ({ url }: Props) => {
  if (!url) return null;

  return (
    <div className="relative my-2 max-w-[360px] cursor-zoom-in overflow-hidden rounded-lg border">
      <img
        src={url}
        alt="Message Image"
        className="size-full rounded-md object-cover"
      />
    </div>
  );
};

export default Thumbnail;
