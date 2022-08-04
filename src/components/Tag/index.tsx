import { Link } from "react-router-dom";

interface TagProps {
  name: string;
}

const Tag = ({ name }: TagProps) => {
  return (
    <>
      <Link to="/" className="tag-pill tag-default">
        {name}
      </Link>
    </>
  );
};

export default Tag;
