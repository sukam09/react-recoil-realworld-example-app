import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useSetRecoilState } from "recoil";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Comment from "@/components/Comment";
import Loading from "@/components/Loading";
import ArticleTag from "@/components/Tag/ArticleTag";
import {
  MyArticleButton,
  OthersArticleButton,
} from "@/components/Article/Button";

import { getArticles } from "@/api/article";
import { getComments, postComments } from "@/api/comment";
import { getUser } from "@/api/user";

import { menuState } from "@/store/state";
import { ArticleProps, CommentProps } from "@/shared/type";
import { TEST_IMAGE } from "@/shared/dummy";
import convertToDate from "@/utils/convertToDate";

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
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [isMyArticle, setIsMyArticle] = useState(false);
  const [pageTitle, setPageTitle] = useState("Loading articles...");

  const isLoggedIn = localStorage.getItem("token");
  const setMenu = useSetRecoilState(menuState);
  const { URLSlug } = useParams();

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

  const initArticle = useCallback(async () => {
    const data = await getArticles(`/articles/${URLSlug}`);
    setArticle(data.article);
  }, [URLSlug]);

  const checkAuth = useCallback(async () => {
    const data = await getUser("/user");
    if (data.user.username === username) {
      setIsMyArticle(true);
    }
  }, [username]);

  const initComments = useCallback(async () => {
    const data = await getComments(`/articles/${URLSlug}/comments`);
    setComments(data.comments);
  }, [URLSlug]);

  useEffect(() => {
    initArticle();
    checkAuth();
    initComments();
    setPageTitle(title);
    // FIXME: use another method, not setTimeout
    setTimeout(() => setLoading(false), 3000);
  }, [checkAuth, initArticle, initComments, title]);

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
                  <span className="date">{convertToDate(createdAt)}</span>
                </div>

                {isMyArticle ? (
                  <MyArticleButton />
                ) : (
                  <OthersArticleButton
                    username={username}
                    following={following}
                    favorited={favorited}
                    favoritesCount={favoritesCount}
                  />
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
                  {/* FIXME: API error*/}
                  {/* <img src={image} /> */}
                  <img src={TEST_IMAGE} />
                </Link>
                <div className="info">
                  <Link to={`/profile/${username}`} className="author">
                    {username}
                  </Link>
                  <span className="date">{convertToDate(createdAt)}</span>
                </div>

                {isMyArticle ? (
                  <MyArticleButton />
                ) : (
                  <OthersArticleButton
                    username={username}
                    following={following}
                    favorited={favorited}
                    favoritesCount={favoritesCount}
                  />
                )}
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
      )}
    </>
  );
};

export default Article;
