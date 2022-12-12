import { useState, useEffect } from "react";
import Loading from "../common/Loading";
import ArticlePreview from "../article/ArticlePreview";
import { getArticles } from "../../api/article";
import { ArticleProps } from "../../types";

interface TagFeedProps {
  name: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const TagFeed = ({ name, loading, setLoading }: TagFeedProps) => {
  const [articles, setArticles] = useState<ArticleProps[]>([]);

  useEffect(() => {
    const initArticles = async () => {
      const { articles } = await getArticles(`/articles?tag=${name}`);
      setArticles(articles);
    };
    initArticles().then(() => setLoading(false));
  }, [name, setLoading]);

  return (
    <>
      {loading ? (
        <div className="article-preview">
          <Loading text="articles" />
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
