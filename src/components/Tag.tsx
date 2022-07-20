interface TagProps {
  name: string;
}

const Tag = ({ name }: TagProps) => {
  return (
    <>
      <a href="/#/" className="tag-pill tag-default">
        {name}
      </a>
    </>
  );
};

export default Tag;
