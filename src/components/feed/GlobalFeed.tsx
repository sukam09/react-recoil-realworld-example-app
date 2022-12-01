import { useState, useEffect } from "react";

import Loading from "../Loading";
import ArticlePreview from "../article/ArticlePreview";
import { getArticles } from "../../api/article";
import { ArticleProps } from "../../types";

const GlobalFeed = () => {
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = ""; // temporary
    const initArticles = async () => {
      const { articles } = await getArticles("/articles");
      setArticles(articles);
    };
    initArticles().then(() => setLoading(false));
  }, []);

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

export default GlobalFeed;
