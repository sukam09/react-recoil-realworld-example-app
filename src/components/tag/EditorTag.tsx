interface EditorTagProps {
  name: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const EditorTag = ({ name, onClick }: EditorTagProps) => {
  return (
    <span className="tag-default tag-pill">
      <i
        className="ion-close-round"
        style={{ cursor: 'pointer', marginRight: '5px' }}
        onClick={onClick}
      ></i>
      {` ${name} `}
    </span>
  );
};

export default EditorTag;
