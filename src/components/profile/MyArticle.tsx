import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import ArticlePreview from "../article/ArticlePreview";
import Loading from "../Loading";

import { getGlobalArticles } from "../../api/article";
import { useRecoilValue } from "recoil";
import { userState } from "../../state";
import { ArticleProps } from "../../types";

interface MyArticleProps {
  handleToggle: (num: number) => void;
}

const MyArticle = () => {
  const { handleToggle } = useOutletContext<MyArticleProps>();
  const [myArticles, setMyArticles] = useState<ArticleProps[]>([]);
  const [loading, setLoading] = useState(true);
  const username = useRecoilValue(userState).username;

  useEffect(() => {
    const initMyArticle = async () => {
      const { articles } = await getGlobalArticles(
        `/articles?author=${username}`
      );
      setMyArticles(articles);
    };
    initMyArticle().then(() => setLoading(false));
  }, [username]);

  useEffect(() => {
    handleToggle(0);
  }, [handleToggle]);

  return (
    <>
      {loading ? (
        <div className="article-preview">
          <Loading />
        </div>
      ) : (
        <>
          {myArticles.length === 0 ? (
            <div className="article-preview">No articles are here... yet.</div>
          ) : (
            myArticles.map((article) => (
              <ArticlePreview key={article.slug} article={article} />
            ))
          )}
        </>
      )}
    </>
  );
};

export default MyArticle;
