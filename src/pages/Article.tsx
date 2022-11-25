import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Comment from "../components/Comment";
import ArticleTag from "../components/tag/ArticleTag";

import { getArticles, deleteArticles } from "../api/article";
import { getComments, postComments } from "../api/comment";

import { menuState, userState } from "../state";
import { ArticleProps, CommentProps } from "../types";
import convertToDate from "../utils";

const Article = () => {
  const [article, setArticle] = useState<ArticleProps>({
    slug: "",
    title: "",
    description: "",
    body: "",
    tagList: [],
    createdAt: "",
    updatedAt: "",
    favorited: false,
    favoritesCount: 0,
    author: {
      username: "",
      image: "",
      bio: "",
      following: false,
    },
  });
  const {
    slug,
    title,
    description,
    body,
    tagList,
    createdAt,
    updatedAt,
    favorited,
    favoritesCount,
    author: { username, image, following },
  } = article;

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [isMyArticle, setIsMyArticle] = useState(false);
  const [pageTitle, setPageTitle] = useState("Loading articles...");

  const isLoggedIn = localStorage.getItem("token");
  const setMenu = useSetRecoilState(menuState);
  const user = useRecoilValue(userState);
  const { URLSlug } = useParams();
  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setComment(value);
  };

  const publishComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);
    const data = await postComments(`/articles/${URLSlug}/comments`, {
      comment: { body: comment },
    });
    setComments([data.comment, ...comments]);
    setComment("");
    setDisabled(false);
  };

  const removeArticle = async () => {
    await deleteArticles(`/articles/${URLSlug}`);
    navigate("/", { replace: true });
  };

  // TODO: change to lazy routing so initArticlePage should be moved to App.tsx
  // FIXME: page title should be applied
  useEffect(() => {
    const initArticlePage = async () => {
      const articleData = await getArticles(`/articles/${URLSlug}`);
      const commentsData = await getComments(`/articles/${URLSlug}/comments`);
      setArticle(articleData.article);
      setComments(commentsData.comments);
      const loggedInUser = user.username;
      setIsMyArticle(username === loggedInUser ? true : false);
    };
    initArticlePage();
  }, [URLSlug, username, user.username, isMyArticle]);

  useEffect(() => setMenu(-1), [setMenu]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
      </HelmetProvider>

      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{title}</h1>

            <div className="article-meta">
              <Link to={`/profile/${username}`}>
                <img src={image} />
              </Link>
              <div className="info">
                {/* FIXME: right margin of profile image is different */}
                <Link to={`/profile/${username}`} className="author">
                  {username}
                </Link>
                <span className="date">{convertToDate(createdAt)}</span>
              </div>
              {isMyArticle ? (
                <>
                  <Link to={`/editor/${slug}`}>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      type="button"
                    >
                      <i className="ion-edit"></i> Edit Article
                    </button>{" "}
                  </Link>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    type="button"
                    onClick={() => removeArticle()}
                  >
                    <i className="ion-trash-a"></i> Delete Article
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="ion-plus-round"></i> Follow {username}{" "}
                  </button>{" "}
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="ion-heart"></i> Favorite Post{" "}
                    <span className="counter">({0})</span>
                  </button>
                </>
              )}
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
                <img src={image} />
              </Link>
              <div className="info">
                <Link to={`/profile/${username}`} className="author">
                  {username}
                </Link>
                <span className="date">{convertToDate(createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              {isLoggedIn ? (
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
                    <img src={image} className="comment-author-img" />
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
                  <Comment
                    key={comment.id}
                    id={comment.id}
                    createdAt={comment.createdAt}
                    body={comment.body}
                    author={comment.author}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
