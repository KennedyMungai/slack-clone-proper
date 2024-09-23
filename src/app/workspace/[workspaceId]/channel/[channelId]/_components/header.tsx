"use client";

type Props = {
  channelName: string;
};

const Header = ({ channelName }: Props) => {
  return <div>{channelName}</div>;
};

export default Header;
