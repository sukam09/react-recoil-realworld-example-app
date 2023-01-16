import { Link } from 'react-router-dom';

interface LinkTagProps {
  name: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
}

const LinkTag = ({ name, onClick }: LinkTagProps) => {
  return (
    <Link to="/" className="tag-default tag-pill" onClick={onClick}>
      {name}
    </Link>
  );
};

export default LinkTag;
