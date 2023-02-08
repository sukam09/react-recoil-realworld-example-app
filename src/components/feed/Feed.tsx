import { useState, useEffect } from 'react';

import ArticlePreview from '../article/ArticlePreview';
import Loading from '../common/Loading';
import Pagination from '../common/Pagination';

import { getArticles } from '../../api/article';
import { ArticleProps } from '../../types';
import { useRecoilState } from 'recoil';
import { pageAtom } from '../../atom';

interface FeedProps {
  query: string;
  url: string;
  limit: number;
}

const Feed = ({ query, url, limit }: FeedProps) => {
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useRecoilState(pageAtom);

  useEffect(() => {
    setPage(1);
  }, [setPage, query]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const initArticles = async () => {
      setLoading(true);
      try {
        const { articles, articlesCount } = await getArticles(
          `${query}limit=${limit}&offset=${10 * (page - 1)}`,
          signal
        );
        setArticles(articles);
        setArticlesCount(articlesCount);
        setLoading(false);
      } catch {}
    };

    initArticles();

    return () => {
      controller.abort();
    };
  }, [limit, query, page]);

  if (loading) {
    return (
      <div className="article-preview">
        <Loading height={30} />
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
      <Pagination articlesCount={articlesCount} url={url} />
    </>
  );
};

export default Feed;
