import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import ArticlePreview from "../article/ArticlePreview";
import Loading from "../Loading";

import { getGlobalArticles } from "../../api/article";
import { useRecoilValue } from "recoil";
import { userState } from "../../state";
import { ArticleProps } from "../../types";

interface FavoritedArticleProps {
  handleToggle: (num: number) => void;
}

const FavoritedArticle = () => {
  const { handleToggle } = useOutletContext<FavoritedArticleProps>();
  const [FavoritedArticles, setFavoritedArticles] = useState<ArticleProps[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    const initFavoritedArticle = async () => {
      const { articles } = await getGlobalArticles(
        `/articles?favorited=${userId}`
      );
      setFavoritedArticles(articles);
    };
    initFavoritedArticle().then(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    handleToggle(1);
  }, [handleToggle]);

  return (
    <>
      {loading ? (
        <div className="article-preview">
          <Loading />
        </div>
      ) : (
        <>
          {FavoritedArticles.length === 0 ? (
            <div className="article-preview">No articles are here... yet.</div>
          ) : (
            FavoritedArticles.map((article) => (
              <ArticlePreview key={article.slug} article={article} />
            ))
          )}
        </>
      )}
    </>
  );
};

export default FavoritedArticle;
