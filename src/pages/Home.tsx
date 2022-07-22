import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MyFeed from "@/components/MyFeed";
import GlobalFeed from "@/components/GlobalFeed";
import Tag from "@/components/Tag";

const Home = () => {
  const isLoggedin = localStorage.getItem("user") !== null;
  const [toggle, setToggle] = useState(isLoggedin ? 0 : 1);

  return (
    <>
      <Header />

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
                    <a
                      className={`nav-link ${toggle === 0 && "active"}`}
                      href="/#"
                      onClick={() => setToggle(0)}
                      hidden={!isLoggedin}
                    >
                      Your Feed
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${toggle === 1 && "active"}`}
                      href="/#"
                      onClick={() => setToggle(1)}
                    >
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>
              {toggle === 0 ? <MyFeed /> : <GlobalFeed />}
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                  <Tag name="programming" />
                  <Tag name="javascript" />
                  <Tag name="amberjs" />
                  <Tag name="angularjs" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
