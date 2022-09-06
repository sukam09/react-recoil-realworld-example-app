import { useState, useEffect } from "react";

import Loading from "@components/Loading";
import { ArticlePreview } from "@components/Article";
import { getArticles } from "@api/article";
import { ArticleProps } from "@shared/type";

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
            <ArticlePreview
              key={article.slug}
              slug={article.slug}
              title={article.title}
              description={article.description}
              tagList={article.tagList}
              createdAt={article.createdAt}
              favorited={article.favorited}
              favoritesCount={article.favoritesCount}
              author={article.author}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default GlobalFeed;
