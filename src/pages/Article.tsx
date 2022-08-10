import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useSetRecoilState } from "recoil";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { getArticles } from "@/api/article";
import Tag from "@/components/Tag/ArticleTag";
import { menuState } from "@/store/state";
import Loading from "@/components/Loading";

import { TEST_IMAGE } from "@/shared/dummy";

// interface ArticleProps {
//   title: string;
//   description: string;
//   body: string;
//   tagList: string[];
//   createdAt: string;
//   updatedAt: string;
//   favorited: boolean;
//   favoritesCount: number;
//   author: UserProps;
// }

const Article = () => {
  const [article, setArticle] = useState({
    title: "",
    body: "",
    tagList: [],
    createdAt: "",
    updatedAt: "",
    favorited: false,
    favoritesCount: 0,
    author: {
      username: "",
      image: "",
    },
  });
  const {
    title,
    body,
    tagList,
    createdAt,
    updatedAt,
    favorited,
    favoritesCount,
    author,
  } = article;
  const { username, image } = author;

  const [loading, setLoading] = useState(true);
  const setMenu = useSetRecoilState(menuState);

  const { slug } = useParams();
  const pageTitle = loading ? "Loading articles..." : `${title} — Conduit`;

  useEffect(() => {
    const initArticle = async () => {
      try {
        const data = await (await getArticles(`/articles/${slug}`)).data;
        const article = data.article;
        setArticle({
          title: article.title,
          body: article.body,
          tagList: article.tagList,
          createdAt: article.createdAt,
          updatedAt: article.updatedAt,
          favorited: article.favorited,
          favoritesCount: article.favoritesCount,
          author: {
            username: article.author.username,
            image: article.author.image,
          },
        });
        setLoading(false);
      } catch (error: any) {
        // setLogin(false);
        // localStorage.clear();
        // navigate("/", { replace: true });
        console.log(error);
      }
    };
    initArticle();
  }, [slug]);

  useEffect(() => setMenu(-1), [setMenu]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
      </HelmetProvider>

      {loading ? (
        <Loading height="50vh" />
      ) : (
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{title}</h1>

              <div className="article-meta">
                <Link to={`/profile/${username}`}>
                  {/* FIXME: API error */}
                  {/* <img src={image} /> */}
                  <img src={TEST_IMAGE} />
                </Link>
                <div className="info">
                  <Link to={`/profile/${username}`} className="author">
                    {username}
                  </Link>
                  <span className="date">{createdAt}</span>
                </div>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-plus-round"></i> Follow {username}{" "}
                  <span className="counter">(10)</span>
                </button>{" "}
                <button className="btn btn-sm btn-outline-primary">
                  <i className="ion-heart"></i> Favorite Post{" "}
                  <span className="counter">({favoritesCount})</span>
                </button>
              </div>
            </div>
          </div>

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <ReactMarkdown children={body} remarkPlugins={[remarkGfm]} />
              </div>
            </div>
            <div>
              {tagList.map((tag) => (
                <Tag key={tag} name={tag} />
              ))}
            </div>

            <hr />

            <div className="article-actions">
              <div className="article-meta">
                <Link to={`/profile/${username}`}>
                  {/* FIXME: API console.error(); */}
                  {/* <img src={image} /> */}
                  <img src={TEST_IMAGE} />
                </Link>
                <div className="info">
                  <Link to={`/profile/${username}`} className="author">
                    {username}
                  </Link>
                  <span className="date">{updatedAt}</span>
                </div>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-plus-round"></i> Follow {username}
                </button>{" "}
                <button className="btn btn-sm btn-outline-primary">
                  <i className="ion-heart"></i> Favorite Post{" "}
                  <span className="counter">({favoritesCount})</span>
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <form className="card comment-form">
                  <div className="card-block">
                    <textarea
                      className="form-control"
                      placeholder="Write a comment..."
                      rows={3}
                    ></textarea>
                  </div>
                  <div className="card-footer">
                    <img
                      src="http://i.imgur.com/Qr71crq.jpg"
                      className="comment-author-img"
                    />
                    <button className="btn btn-sm btn-primary">
                      Post Comment
                    </button>
                  </div>
                </form>

                <div className="card">
                  <div className="card-block">
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                  </div>
                  <div className="card-footer">
                    <Link to="" className="comment-author">
                      <img
                        src="http://i.imgur.com/Qr71crq.jpg"
                        className="comment-author-img"
                      />
                    </Link>{" "}
                    <Link to="" className="comment-author">
                      Jacob Schmidt
                    </Link>
                    <span className="date-posted">Dec 29th</span>
                  </div>
                </div>

                <div className="card">
                  <div className="card-block">
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                  </div>
                  <div className="card-footer">
                    <Link to="" className="comment-author">
                      <img
                        src="http://i.imgur.com/Qr71crq.jpg"
                        className="comment-author-img"
                      />
                    </Link>{" "}
                    <Link to="" className="comment-author">
                      Jacob Schmidt
                    </Link>
                    <span className="date-posted">Dec 29th</span>
                    <span className="mod-options">
                      <i className="ion-edit"></i>
                      <i className="ion-trash-a"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Article;
