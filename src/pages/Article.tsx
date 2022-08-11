import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useSetRecoilState, useRecoilValue } from "recoil";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import ArticleTag from "@/components/Tag/ArticleTag";
import Comment from "@/components/Comment";
import Loading from "@/components/Loading";

import { getArticles } from "@/api/article";
import { getComments, postComments } from "@/api/comment";

import { menuState, tokenState, loginState } from "@/store/state";
import { UserProps } from "@/shared/type";
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

export interface CommentProps {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  body: string;
  author?: UserProps;
}

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
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const setMenu = useSetRecoilState(menuState);
  const token = useRecoilValue(tokenState);
  const login = useRecoilValue(loginState);

  const { slug } = useParams();
  const pageTitle = loading ? "Loading articles..." : `${title} — Conduit`;

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setComment(value);
  };

  const publishComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);
    try {
      const data = await (
        await postComments(
          `/articles/${slug}/comments`,
          { comment: { body: comment } },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
      ).data;
      const newComment = data.comment;
      setComments([newComment, ...comments]);
      setComment("");
    } catch (error: any) {
      console.log(error);
      // TODO: forced logout when 404
    }
    setDisabled(false);
  };

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
        // TODO: forced logout when 404
        // setLogin(false);
        // localStorage.clear();
        // navigate("/", { replace: true });
        console.log(error);
      }
    };
    initArticle();
  }, [slug]);

  useEffect(() => {
    const initComments = async () => {
      try {
        const config = login
          ? { headers: { Authorization: `Token ${token}` } }
          : undefined;
        const data = await (
          await getComments(`/articles/${slug}/comments`, config)
        ).data;
        const commentsData = data.comments;
        setComments(commentsData);
      } catch (error: any) {
        console.log(error);
      }
    };
    initComments();
  }, [slug, token, login]);

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
                <ArticleTag key={tag} name={tag} />
              ))}
            </div>

            <hr />

            <div className="article-actions">
              <div className="article-meta">
                <Link to={`/profile/${username}`}>
                  {/* FIXME: API error*/}
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
                {login ? (
                  <form className="card comment-form" onSubmit={publishComment}>
                    <div className="card-block">
                      <textarea
                        className="form-control"
                        placeholder="Write a comment..."
                        rows={3}
                        value={comment}
                        onChange={onChange}
                        disabled={disabled}
                      ></textarea>
                    </div>
                    <div className="card-footer">
                      <img
                        // src={image} // FIXME: API error
                        src={TEST_IMAGE}
                        className="comment-author-img"
                      />
                      <button
                        className="btn btn-sm btn-primary"
                        disabled={disabled}
                      >
                        Post Comment
                      </button>
                    </div>
                  </form>
                ) : (
                  <p>
                    <Link to="/login">Sign in</Link> or{" "}
                    <Link to="/register">Sign up</Link> to add comments on this
                    article.
                  </p>
                )}

                <div>
                  {comments.map((comment) => (
                    <Comment key={comment.id} body={comment.body} />
                  ))}
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
