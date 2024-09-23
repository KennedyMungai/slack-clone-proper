type Props = {
  params: {
    workspaceId: string;
    channelId: string;
  };
};

const ChannelPage = ({ params: { channelId, workspaceId } }: Props) => {
  return <div>ChannelPage</div>;
};

export default ChannelPage;
