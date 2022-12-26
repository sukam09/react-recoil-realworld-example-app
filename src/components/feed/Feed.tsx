import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";

import ArticlePreview from "../article/ArticlePreview";
import Loading from "../common/Loading";
import Pagination from "../common/Pagination";

import { getArticles } from "../../api/article";
import { ArticleProps } from "../../types";

interface FeedProps {
  query: string;
  url: string;
  tagLoading?: boolean;
  setTagLoading?: Dispatch<SetStateAction<boolean>>;
}

const Feed = ({ query, url, tagLoading, setTagLoading }: FeedProps) => {
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [articlesCount, setArticlesCount] = useState(0);

  const movePage = (num: number) => {
    setPage(num);
    if (num === page) initArticles().then(() => setLoading(false));
  };

  const initArticles = useCallback(async () => {
    setLoading(true);
    setArticlesCount(0);
    const queryString = `${query}limit=10&offset=${10 * (page - 1)}`;
    try {
      const { articles, articlesCount } = await getArticles(queryString);
      setArticles(articles);
      setArticlesCount(articlesCount);
    } catch {}
  }, [page, query]);

  useEffect(() => {
    initArticles().then(() => {
      setLoading(false);
      if (tagLoading) setTagLoading!(false);
    });
  }, [initArticles, tagLoading, setTagLoading]);

  return (
    <>
      {loading ? (
        <div className="article-preview">
          <Loading text="articles" />
        </div>
      ) : articlesCount === 0 ? (
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
  );
};

export default Feed;
