import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import { getGlobalArticles } from "../../api/article";
import { useRecoilValue } from "recoil";
import { userState } from "../../state";

interface MyArticleProps {
  handleToggle: (num: number) => void;
}

const MyArticle = () => {
  const [myArticle, setMyArticle] = useState({});
  const username = useRecoilValue(userState).username;
  const { handleToggle } = useOutletContext<MyArticleProps>();

  useEffect(() => {
    const initMyArticle = async () => {
      const data = await getGlobalArticles(
        `/articles?author=${username}&limit=20&offset=0`
      );
    };
    initMyArticle();
  }, [username]);

  useEffect(() => {
    handleToggle(0);
  }, [handleToggle]);

  return (
    <>
      <div>My Article</div>
    </>
  );
};

export default MyArticle;
