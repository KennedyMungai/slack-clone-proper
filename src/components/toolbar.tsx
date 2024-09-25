type Props = {
  isAuthor: boolean;
  isPending: boolean;
  handleEditing: () => void;
  handleThread: () => void;
  handleDelete: () => void;
  hideThreadButton: boolean;
};

const Toolbar = ({handleDelete, handleEditing, handleThread, hideThreadButton, isAuthor, isPending}: Props) => {
  return <div>Toolbar</div>;
};

export default Toolbar;
