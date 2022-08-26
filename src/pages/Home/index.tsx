import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { MyFeed, GlobalFeed } from "@/components/Feed";
import LinkTag from "@/components/Tag/LinkTag";
import { menuState } from "@/store/state";

const Home = () => {
  const setMenu = useSetRecoilState(menuState);
  const isLoggedIn = localStorage.getItem("token");
  const [toggle, setToggle] = useState(isLoggedIn ? 0 : 1);
  // test
  const [tagList, setTagList] = useState([
    "implementations",
    "welcome",
    "introduction",
    "codebaseShow",
  ]);

  const onClick = (tag: string) => {
    // test
    console.log(tag);
  };

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
                </ul>
              </div>
              {toggle === 0 ? <MyFeed /> : <GlobalFeed />}
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <div className="tag-list">
                  {tagList.map((tag) => (
                    <LinkTag
                      key={tag}
                      name={tag}
                      onClick={() => onClick(tag)}
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
