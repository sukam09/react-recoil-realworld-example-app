interface RemovableTagProps {
  name: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const RemovableTag = ({ name, onClick }: RemovableTagProps) => {
  return (
    <span className="tag-default tag-pill">
      <i
        className="ion-close-round"
        style={{ cursor: "pointer", marginRight: "5px" }}
        onClick={onClick}
      ></i>
      {` ${name} `}
    </span>
  );
};

export default RemovableTag;
