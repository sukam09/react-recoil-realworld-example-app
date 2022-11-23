import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Comment from "../components/Comment";
import Loading from "../components/Loading";
import ArticleTag from "../components/tag/ArticleTag";

import { getArticles } from "../api/article";
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
  const user = useRecoilValue(userState);
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

  // TODO: add React.SetStateAction about isMyArticle and pageTitle
  useEffect(() => {
    const initArticlePage = async () => {
      const articleData = await getArticles(`/articles/${URLSlug}`);
      const commentsData = await getComments(`/articles/${URLSlug}/comments`);
      setArticle(articleData.article);
      setComments(commentsData.comments);
      setLoading(false);
    };
    initArticlePage();
  }, [URLSlug]);

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
      )}
    </>
  );
};

export default Article;
