import { useState, useEffect } from "react";

import Loading from "../Loading";
import ArticlePreview from "../article/ArticlePreview";
import { getArticles } from "../../api/article";
import { ArticleProps } from "../../types";

const Feed = ({ query }: { query: string }) => {
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initArticles = async () => {
      const { articles } = await getArticles(`/articles${query}`);
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
          {articles.length === 0 ? (
            <div className="article-preview">No articles are here... yet.</div>
          ) : (
            articles.map((article) => (
              <ArticlePreview key={article.slug} article={article} />
            ))
          )}
        </>
      )}
    </>
  );
};

export default Feed;
