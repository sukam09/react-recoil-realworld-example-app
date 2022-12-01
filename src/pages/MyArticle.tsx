import { useState, useEffect } from "react";
import { getGlobalArticles } from "../api/article";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

const MyArticle = () => {
  const [myArticle, setMyArticle] = useState({});
  const username = useRecoilValue(userState).username;

  useEffect(() => {
    const initMyArticle = async () => {
      const data = await getGlobalArticles(
        `/articles?author=${username}&limit=20&offset=0`
      );
    };
    initMyArticle();
  }, [username]);

  return (
    <>
      <div>My Article</div>
    </>
  );
};

export default MyArticle;
