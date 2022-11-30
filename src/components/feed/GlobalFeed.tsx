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
      try {
        const data = await getArticles(`/articles?${query}`);
        setArticles(data.articles);
        setLoading(false);
      } catch (error: any) {
        console.log(error);
      }
    };
    initArticles();
  }, []);

  return (
    <>
      {loading ? (
        <div className="article-preview">
          <Loading height="30vh" />
        </div>
      ) : (
        <div>
          {articles.map((article) => (
            <ArticlePreview key={article.slug} article={article} />
          ))}
        </div>
      )}
    </>
  );
};

export default GlobalFeed;
