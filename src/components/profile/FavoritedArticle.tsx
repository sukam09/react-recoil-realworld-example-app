import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

interface FavoritedArticleProps {
  handleToggle: (num: number) => void;
}

const FavoritedArticle = () => {
  const { handleToggle } = useOutletContext<FavoritedArticleProps>();

  useEffect(() => {
    handleToggle(1);
  }, [handleToggle]);

  return (
    <>
      <div>Favorited Article</div>
    </>
  );
};

export default FavoritedArticle;
