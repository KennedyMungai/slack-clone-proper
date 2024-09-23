type Props = {
  params: {
    workspaceId: string;
    channelId: string;
  };
};

const ChannelPage = ({ params: { channelId, workspaceId } }: Props) => {
  return <div>{channelId}</div>;
};

export default ChannelPage;
