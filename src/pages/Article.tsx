import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Comment from "../components/article/Comment";
import ArticleTag from "../components/tag/ArticleTag";
import FollowButton from "../components/FollowButton";

import { getArticles, deleteArticles } from "../api/article";
import { getComments, postComments } from "../api/comment";
import { postFavorites, deleteFavorites } from "../api/favorites";

import { menuState, userState } from "../state";
import { ArticleProps, CommentProps } from "../types";
import { convertToDate } from "../utils";
import { postFollow, deleteFollow } from "../api/profile";
import Loading from "../components/Loading";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const UNFAVORITED_CLASS = "btn btn-sm btn-outline-primary";

const Article = () => {
  const [article, setArticle] = useState<ArticleProps>({
    slug: "",
    title: "",
    description: "",
    tagList: [],
    body: "",
    createdAt: "",
    favorited: false,
    favoritesCount: 0,
    author: {
      username: "",
      bio: "",
      image: "",
      following: false,
    },
  });

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [pageTitle, setPageTitle] = useState("Home — Conduit");
  const [loading, setLoading] = useState(true);

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

  const follow = async () => {
    setArticle({
      ...article,
      author: {
        ...article.author,
        following: true,
      },
    });
    await postFollow(`/profiles/${article.author.username}/follow`);
  };

  const unfollow = async () => {
    setArticle({
      ...article,
      author: {
        ...article.author,
        following: false,
      },
    });
    await deleteFollow(`/profiles/${article.author.username}/follow`);
  };

  const favorite = async () => {
    setArticle({
      ...article,
      favorited: true,
      favoritesCount: article.favoritesCount + 1,
    });
    await postFavorites(`/articles/${article.slug}/favorite`);
  };

  const unfavorite = async () => {
    setArticle({
      ...article,
      favorited: false,
      favoritesCount: article.favoritesCount - 1,
    });
    await deleteFavorites(`/articles/${article.slug}/favorite`);
  };

  useEffect(() => {
    const initArticlePage = async () => {
      const articleData = await getArticles(`/articles/${URLSlug}`);
      const commentsData = await getComments(`/articles/${URLSlug}/comments`);
      setArticle(articleData.article);
      setPageTitle(articleData.article.title);
      setComments(commentsData.comments);
      setIsUser(articleData.article.author.username === user.username);
    };
    initArticlePage().then(() => setLoading(false));
  }, [URLSlug, user.username]);

  useEffect(() => setMenu(-1), [setMenu]);

  if (loading) return <Loading />;

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
            <h1>{article.title}</h1>

            <div className="article-meta">
              <Link to={`/profile/${article.author.username}`}>
                <img src={article.author.image} />
              </Link>
              <div className="info">
                {/* FIXME: right margin of profile image is different */}
                <Link
                  to={`/profile/${article.author.username}`}
                  className="author"
                >
                  {article.author.username}
                </Link>
                <span className="date">{convertToDate(article.createdAt)}</span>
              </div>
              {isUser ? (
                <>
                  <Link to={`/editor/${article.slug}`}>
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
                  <FollowButton
                    following={article.author.following}
                    username={article.author.username}
                    follow={follow}
                    unfollow={unfollow}
                  />
                  &nbsp;&nbsp;
                  <button
                    className={
                      article.favorited ? FAVORITED_CLASS : UNFAVORITED_CLASS
                    }
                    type="button"
                    onClick={() =>
                      article.favorited ? unfavorite() : favorite()
                    }
                  >
                    <i className="ion-heart"></i>
                    &nbsp; {article.favorited ? "Unfavorite" : "Favorite"} Post
                    <span className="counter">({article.favoritesCount})</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <ReactMarkdown
                children={article.body!}
                remarkPlugins={[remarkGfm]}
              />
            </div>
          </div>
          <div>
            {article.tagList.map((tag) => (
              <ArticleTag key={tag} name={tag} />
            ))}
          </div>
          <hr />
          <div className="article-actions">
            <div className="article-meta">
              <Link to={`/profile/${article.author.username}`}>
                <img src={article.author.image} />
              </Link>
              <div className="info">
                <Link
                  to={`/profile/${article.author.username}`}
                  className="author"
                >
                  {article.author.username}
                </Link>
                <span className="date">{convertToDate(article.createdAt)}</span>
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
                    <img
                      src={article.author.image}
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
                  <Comment key={comment.id} comment={comment} />
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
