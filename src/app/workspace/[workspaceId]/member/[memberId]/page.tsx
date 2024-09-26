type Props = {
  params: { workspaceId: string; memberId: string };
};

const MemberPage = ({ params: { memberId, workspaceId } }: Props) => {
  return <div>MemberPage</div>;
};

export default MemberPage;
