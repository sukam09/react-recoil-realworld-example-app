import { useState, useEffect } from "react";

import ArticlePreview from "../article/ArticlePreview";
import Loading from "../common/Loading";
import Pagination from "../common/Pagination";

import { getArticles } from "../../api/article";
import { ArticleProps } from "../../types";

interface FeedProps {
  query: string;
  url: string;
  num?: number;
  handleToggle?: (num: number) => void;
}

const Feed = ({ query, url, num, handleToggle }: FeedProps) => {
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [articlesCount, setArticlesCount] = useState(0);

  // TODO: move scroll to top after loading
  const movePage = (num: number) => {
    setLoading(true);
    window.scrollTo(0, 0);
    setPage(num);
  };

  useEffect(() => {
    const initArticles = async () => {
      setLoading(true);
      const url =
        query === "/feed" ? query : `${query}&offset=${10 * (page - 1)}`;
      const { articles, articlesCount } = await getArticles(`/articles${url}`);
      setArticles(articles);
      setArticlesCount(articlesCount);
    };
    initArticles().then(() => {
      setLoading(false);
    });
  }, [query, page]);

  useEffect(() => {
    if (handleToggle && num) handleToggle(num);
  }, [handleToggle, num]);

  return (
    <>
      {loading ? (
        <div className="article-preview">
          <Loading text="articles" />
        </div>
      ) : (
        <>
          {articlesCount === 0 ? (
            <div className="article-preview">No articles are here... yet.</div>
          ) : (
            articles.map((article) => (
              <ArticlePreview key={article.slug} article={article} />
            ))
          )}
          <Pagination
            page={page}
            articlesCount={articlesCount}
            movePage={movePage}
            url={url}
          />
        </>
      )}
    </>
  );
};

export default Feed;
