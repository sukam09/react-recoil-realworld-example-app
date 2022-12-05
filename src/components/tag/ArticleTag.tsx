const ArticleTag = ({ name }: { name: string }) => {
  return <li className="tag-default tag-pill tag-outline">{` ${name} `}</li>;
};

export default ArticleTag;
