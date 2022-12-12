import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Feed from "../components/feed/Feed";
import TagFeed from "../components/feed/TagFeed";
import LinkTag from "../components/tag/LinkTag";
import Loading from "../components/common/Loading";

import { isLoggedInState, menuState } from "../state";
import { getTags } from "../api/tags";

const ACTIVE_CLASS = "nav-link active";
const INACTIVE_CLASS = "nav-link";

const Home = () => {
  const setMenu = useSetRecoilState(menuState);
  const isLoggedIn = useRecoilValue(isLoggedInState);

  const [toggle, setToggle] = useState(isLoggedIn ? 0 : 1);
  const [tagList, setTagList] = useState<string[]>([]);
  const [tagName, setTagName] = useState("");
  const [tagLoading, setTagLoading] = useState(false);
  const [tagListLoading, setTagListLoading] = useState(false);

  const navigate = useNavigate();

  const handleClickTag = (tag: string) => {
    handleTagLoading(true);
    setToggle(2);
    setTagName(tag);
  };

  const handleTagLoading = (loading: boolean) => setTagLoading(loading);

  useEffect(() => {
    const initTags = async () => {
      setTagListLoading(true);
      const data = await getTags("/tags");
      setTagList(data.tags);
    };
    initTags().then(() => setTagListLoading(false));
  }, []);

  useEffect(() => {
    setMenu(0);
  }, [setMenu]);

  useEffect(() => navigate("/", { replace: true }), [navigate]);

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
                      className={toggle === 0 ? ACTIVE_CLASS : INACTIVE_CLASS}
                      to="/"
                      onClick={() => setToggle(0)}
                      hidden={!isLoggedIn}
                    >
                      Your Feed
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={toggle === 1 ? ACTIVE_CLASS : INACTIVE_CLASS}
                      to="/"
                      onClick={() => setToggle(1)}
                    >
                      Global Feed
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={ACTIVE_CLASS}
                      to="/"
                      onClick={() => setToggle(2)}
                      hidden={toggle !== 2}
                    >
                      <i className="ion-pound"></i> {tagName}{" "}
                    </Link>
                  </li>
                </ul>
              </div>
              {toggle === 0 && <Feed query="/feed" url="/" />}
              {toggle === 1 && <Feed query="?limit=10" url="/" />}
              {toggle === 2 && (
                <TagFeed
                  name={tagName}
                  loading={tagLoading}
                  setLoading={handleTagLoading}
                />
              )}
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <div className="tag-list">
                  {tagListLoading ? (
                    <Loading text="tags" />
                  ) : (
                    tagList.map((tag) => (
                      <LinkTag
                        key={tag}
                        name={tag}
                        onClick={() => handleClickTag(tag)}
                      />
                    ))
                  )}
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
