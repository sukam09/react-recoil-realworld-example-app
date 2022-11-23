interface ArticleTagProps {
  name: string;
}

const ArticleTag = ({ name }: ArticleTagProps) => {
  return (
    <span className="tag-default tag-pill tag-outline">{` ${name} `}</span>
  );
};

export default ArticleTag;
