import { useState, useEffect, useRef } from "react";

import ArticlePreview from "../article/ArticlePreview";
import Loading from "../common/Loading";
import Pagination from "../common/Pagination";
import { getArticles } from "../../api/article";
import { ArticleProps } from "../../types";

interface FeedProps {
  query: string;
  url: string;
  limit: number;
}

const Feed = ({ query, url, limit }: FeedProps) => {
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [articlesCount, setArticlesCount] = useState(0);
  const prevQuery = usePrevious(query);

  // TODO: use lodash debounce
  useEffect(() => {
    const initArticles = async () => {
      setLoading(true);
      let offset;
      if (prevQuery === query) {
        offset = 10 * (page - 1);
      } else {
        offset = 0;
        setPage(1);
      }
      const queryString = `${query}limit=${limit}&offset=${offset}`;
      try {
        const { articles, articlesCount } = await getArticles(queryString);
        setArticles(articles);
        setArticlesCount(articlesCount);
      } catch {}
      setLoading(false);
    };
    initArticles();
  }, [limit, page, query, prevQuery]);

  if (loading) {
    return (
      <div className="article-preview">
        <Loading text="articles" />
      </div>
    );
  }

  if (articlesCount === 0) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  return (
    <>
      {articles.map((article) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}
      <Pagination
        page={page}
        articlesCount={articlesCount}
        setPage={setPage}
        url={url}
      />
    </>
  );
};

const usePrevious = (value: string) => {
  const ref = useRef<string>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default Feed;
