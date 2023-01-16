import { useState, useEffect, useRef } from 'react';

import ArticlePreview from '../article/ArticlePreview';
import Loading from '../common/Loading';
import Pagination from '../common/Pagination';
import { getArticles } from '../../api/article';
import { ArticleProps } from '../../types';

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

  useEffect(() => {
    let canceled = false;
    const initArticles = async () => {
      let offset = 10 * (page - 1);
      if (prevQuery !== query) {
        setPage(1);
        offset = 0;
      }
      const queryString = `${query}limit=${limit}&offset=${offset}`;
      try {
        const { articles, articlesCount } = await getArticles(queryString);
        if (!canceled) {
          setArticles(articles);
          setArticlesCount(articlesCount);
        }
      } catch {}
      setLoading(false);
    };

    initArticles();

    return () => {
      canceled = true;
    };
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
      {articles.map(article => (
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
