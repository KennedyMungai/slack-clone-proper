import { Id } from "../../../../convex/_generated/dataModel";

type Props = {
  memberId: Id<"members">;
  onClose: () => void;
};

const Profile = ({memberId, onClose}: Props) => {
  return <div>Profile</div>;
};

export default Profile;
