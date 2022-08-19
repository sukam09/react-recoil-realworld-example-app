import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import Loading from "@/components/Loading";
import { ArticlePreview } from "@/components/Article";
import { loginState, tokenState } from "@/store/state";
import { getArticles } from "@/api/article";
import { ArticleProps } from "@/shared/type";

const GlobalFeed = () => {
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [loading, setLoading] = useState(true);

  const login = useRecoilValue(loginState);
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    const query = ""; // temporary
    const initArticles = async () => {
      try {
        const config = login
          ? { headers: { Authorization: `Token ${token}` } }
          : undefined;
        const articles = await (
          await getArticles(`/articles?${query}`, config)
        ).data.articles;
        setArticles(articles);
        setLoading(false);
      } catch (error: any) {
        console.error(error);
      }
    };
    initArticles();
  }, [login, token]);

  return (
    <>
      {loading ? (
        <div className="article-preview">
          <Loading height="30vh" />
        </div>
      ) : (
        <div>
          {articles.map((article) => (
            <ArticlePreview
              key={article.slug}
              slug={article.slug}
              title={article.title}
              description={article.description}
              tagList={article.tagList}
              createdAt={article.createdAt}
              favorited={article.favorited}
              favoritesCount={article.favoritesCount}
              author={article.author}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default GlobalFeed;
