import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import Comment from '../components/article/Comment';
import ArticleTag from '../components/tag/ArticleTag';
import ArticleAction from '../components/article/ArticleAction';
import Loading from '../components/common/Loading';

import { getArticle, deleteArticle } from '../api/article';
import { deleteComment, getComments, postComment } from '../api/comment';
import { postFavorites, deleteFavorites } from '../api/favorites';
import { postFollow, deleteFollow } from '../api/profile';

import { isLoggedInAtom, userAtom } from '../atom';
import { ArticleProps, CommentProps } from '../types';
import { convertToDate } from '../utils';

const Article = () => {
  const [article, setArticle] = useState<ArticleProps>({
    slug: '',
    title: '',
    description: '',
    tagList: [],
    body: '',
    createdAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
  });
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [isUser, setIsUser] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const user = useRecoilValue(userAtom);
  const { URLSlug } = useParams();
  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setComment(value);
  };

  const removeArticle = async () => {
    await deleteArticle(URLSlug!);
    navigate('/', { replace: true });
  };

  const publishComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await postComment(URLSlug!, {
      comment: { body: comment },
    });
    setComments([data.comment, ...comments]);
    setComment('');
  };

  const removeComment = async (id: number) => {
    await deleteComment(URLSlug!, id);
    setComments(comments.filter(comment => comment.id !== id));
  };

  const follow = async () => {
    await postFollow(article.author.username);
    setArticle({
      ...article,
      author: {
        ...article.author,
        following: true,
      },
    });
  };

  const unfollow = async () => {
    await deleteFollow(article.author.username);
    setArticle({
      ...article,
      author: {
        ...article.author,
        following: false,
      },
    });
  };

  const favorite = async () => {
    await postFavorites(article.slug);
    setArticle({
      ...article,
      favorited: true,
      favoritesCount: article.favoritesCount + 1,
    });
  };

  const unfavorite = async () => {
    await deleteFavorites(article.slug);
    setArticle({
      ...article,
      favorited: false,
      favoritesCount: article.favoritesCount - 1,
    });
  };

  useEffect(() => {
    const initArticle = async () => {
      try {
        setLoading(true);
        const { article } = await getArticle(URLSlug!);
        setArticle(article);
        setPageTitle(article.title);
        setIsUser(article.author.username === user.username);
      } catch (err: any) {
        navigate('/', { replace: true });
      }
    };
    initArticle().then(() => setLoading(false));
  }, [URLSlug, user.username, navigate]);

  useEffect(() => {
    const initComments = async () => {
      const { comments } = await getComments(URLSlug!);
      setComments(comments);
    };
    initComments();
  }, [URLSlug]);

  if (loading) return <Loading text="article" />;

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
                <Link
                  to={`/profile/${article.author.username}`}
                  className="author"
                >
                  {article.author.username}
                </Link>
                <span className="date">{convertToDate(article.createdAt)}</span>
              </div>

              <ArticleAction
                isUser={isUser}
                removeArticle={removeArticle}
                follow={follow}
                unfollow={unfollow}
                favorite={favorite}
                unfavorite={unfavorite}
                article={article}
              />
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
            {article.tagList.map(tag => (
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

              <ArticleAction
                isUser={isUser}
                removeArticle={removeArticle}
                follow={follow}
                unfollow={unfollow}
                favorite={favorite}
                unfavorite={unfavorite}
                article={article}
              />
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
                    ></textarea>
                  </div>
                  <div className="card-footer">
                    <img src={user.image} className="comment-author-img" />
                    <button className="btn btn-sm btn-primary">
                      Post Comment
                    </button>
                  </div>
                </form>
              ) : (
                <p>
                  <Link to="/login">Sign in</Link> or{' '}
                  <Link to="/register">Sign up</Link> to add comments on this
                  article.
                </p>
              )}
              <div>
                {comments.map(comment => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    removeComment={removeComment}
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
