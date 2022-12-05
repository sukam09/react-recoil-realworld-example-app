import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { Helmet, HelmetProvider } from "react-helmet-async";

import MyFeed from "../components/feed/MyFeed";
import GlobalFeed from "../components/feed/GlobalFeed";
import TagFeed from "../components/feed/TagFeed";
import LinkTag from "../components/tag/LinkTag";
import { isLoggedInState, menuState } from "../state";
import { getTags } from "../api/tags";

const Home = () => {
  const setMenu = useSetRecoilState(menuState);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [toggle, setToggle] = useState(isLoggedIn ? 0 : 1);
  const [tagList, setTagList] = useState<string[]>([]);
  const [tagName, setTagName] = useState("");
  const [tagLoading, setTagLoading] = useState(true);

  const handleClickTag = (tag: string) => {
    handleTagLoading(true);
    setToggle(2);
    setTagName(tag);
  };

  const handleTagLoading = (isLoading: boolean) => setTagLoading(isLoading);

  useEffect(() => {
    const initTags = async () => {
      const data = await getTags("/tags");
      setTagList(data.tags);
    };
    initTags();
  }, []);

  useEffect(() => {
    setMenu(0);
  }, [setMenu]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Home — Conduit</title>
        </Helmet>
      </HelmetProvider>

      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${toggle === 0 && "active"}`}
                      to="/"
                      onClick={() => setToggle(0)}
                      hidden={!isLoggedIn}
                    >
                      Your Feed
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${toggle === 1 && "active"}`}
                      to="/"
                      onClick={() => setToggle(1)}
                    >
                      Global Feed
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      to="/"
                      onClick={() => setToggle(2)}
                      hidden={toggle !== 2}
                    >
                      <i className="ion-pound"></i> {tagName}{" "}
                    </Link>
                  </li>
                </ul>
              </div>
              <MyFeed toggle={toggle} />
              <GlobalFeed toggle={toggle} />
              <TagFeed
                toggle={toggle}
                name={tagName}
                loading={tagLoading}
                setLoading={handleTagLoading}
              />
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <div className="tag-list">
                  {tagList.map((tag) => (
                    <LinkTag
                      key={tag}
                      name={tag}
                      onClick={() => handleClickTag(tag)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
