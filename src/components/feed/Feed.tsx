import { useState, useEffect } from "react";

import Loading from "../Loading";
import ArticlePreview from "../article/ArticlePreview";
import Pagination from "../Pagination";

import { getArticles } from "../../api/article";
import { ArticleProps } from "../../types";

const Feed = ({ query }: { query: string }) => {
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [articlesCount, setArticlesCount] = useState(0);

  const movePage = (num: number) => {
    setPage(num);
  };

  useEffect(() => {
    const initArticles = async () => {
      const url =
        query === "/feed" ? query : `${query}&offset=${10 * (page - 1)}`;
      const { articles, articlesCount } = await getArticles(`/articles${url}`);
      setArticles(articles);
      setArticlesCount(articlesCount);
    };
    initArticles().then(() => setLoading(false));
  }, [query, page]);

  return (
    <>
      {loading ? (
        <div className="article-preview">
          <Loading />
        </div>
      ) : (
        <>
          {articlesCount === 0 ? (
            <div className="article-preview">No articles are here... yet.</div>
          ) : (
            articles.map((article) => (
              <ArticlePreview
                key={article.slug}
                article={article}
                isFavorites={false}
                decreaseLength={undefined}
              />
            ))
          )}
          <Pagination
            page={page}
            articlesCount={articlesCount}
            movePage={movePage}
          />
        </>
      )}
    </>
  );
};

export default Feed;
