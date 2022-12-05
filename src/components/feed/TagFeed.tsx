import { useState, useEffect } from "react";
import Loading from "../Loading";
import ArticlePreview from "../article/ArticlePreview";
import { getArticles } from "../../api/article";
import { ArticleProps } from "../../types";

interface TagFeedProps {
  toggle: number;
  name: string;
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const TagFeed = ({ toggle, name, loading, setLoading }: TagFeedProps) => {
  const [articles, setArticles] = useState<ArticleProps[]>([]);

  useEffect(() => {
    const initArticles = async () => {
      const { articles } = await getArticles(`/articles?tag=${name}`);
      setArticles(articles);
    };
    initArticles().then(() => setLoading(false));
  }, [name, setLoading]);

  if (toggle !== 2) return null;
  return (
    <>
      {loading ? (
        <div className="article-preview">
          <Loading />
        </div>
      ) : (
        <>
          {articles.map((article) => (
            <ArticlePreview key={article.slug} article={article} />
          ))}
        </>
      )}
    </>
  );
};

export default TagFeed;
