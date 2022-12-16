import { useState, useEffect, useCallback } from "react";

import ArticlePreview from "../article/ArticlePreview";
import Loading from "../common/Loading";
import Pagination from "../common/Pagination";

import { getArticles } from "../../api/article";
import { ArticleProps } from "../../types";

const Feed = ({ query, url }: { query: string; url: string }) => {
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [articlesCount, setArticlesCount] = useState(0);

  const movePage = (num: number) => {
    setPage(num);
    if (num === page) initArticles().then(() => setLoading(false));
  };

  const initArticles = useCallback(async () => {
    try {
      setLoading(true);
      const url = `${query}?limit=10&offset=${10 * (page - 1)}`;
      const { articles, articlesCount } = await getArticles(`/articles${url}`);
      setArticles(articles);
      setArticlesCount(articlesCount);
    } catch (err: any) {}
  }, [page, query]);

  useEffect(() => {
    initArticles().then(() => setLoading(false));
  }, [initArticles]);

  return (
    <>
      {articles.map((article) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}
      {loading ? (
        <div className="article-preview">
          <Loading text="articles" />
        </div>
      ) : articlesCount === 0 ? (
        <div className="article-preview">No articles are here... yet.</div>
      ) : null}
      <Pagination
        page={page}
        articlesCount={articlesCount}
        movePage={movePage}
        url={url}
      />
    </>
  );
};

export default Feed;
