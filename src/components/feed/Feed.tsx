import { useState, useEffect } from "react";

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

  useEffect(() => {
    setLoading(true);
    setPage(1);
  }, [query]);

  useEffect(() => {
    const initArticles = async () => {
      const queryString = `${query}limit=${limit}&offset=${10 * (page - 1)}`;
      try {
        const { articles, articlesCount } = await getArticles(queryString);
        setArticles(articles);
        setArticlesCount(articlesCount);
      } catch (e: any) {
        console.log(e);
      }
    };
    initArticles().then(() => setLoading(false));
  }, [page, query, limit]);

  if (loading)
    return (
      <div className="article-preview">
        <Loading text="articles" />
      </div>
    );

  if (articlesCount === 0)
    return <div className="article-preview">No articles are here... yet.</div>;

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

export default Feed;
