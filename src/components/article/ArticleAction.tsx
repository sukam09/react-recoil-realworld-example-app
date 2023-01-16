import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleProps } from '../../types';
import FollowButton from '../common/FollowButton';

import { useRecoilValue } from 'recoil';
import { isLoggedInAtom } from '../../atom';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const UNFAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

interface ArticleActionProps {
  isUser: boolean;
  removeArticle: () => Promise<void>;
  follow: () => Promise<void>;
  unfollow: () => Promise<void>;
  favorite: () => Promise<void>;
  unfavorite: () => Promise<void>;
  article: ArticleProps;
}

const ArticleAction = ({
  isUser,
  removeArticle,
  follow,
  unfollow,
  favorite,
  unfavorite,
  article,
}: ArticleActionProps) => {
  const [disabled, setDisabled] = useState(false);
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const navigate = useNavigate();

  return isUser ? (
    <>
      <button
        className="btn btn-sm btn-outline-secondary"
        type="button"
        onClick={() => navigate(`/editor/${article.slug}`)}
      >
        <i className="ion-edit"></i> Edit Article
      </button>{' '}
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
          article.favorited
            ? `${FAVORITED_CLASS} ${disabled ? 'disabled' : ''}`
            : `${UNFAVORITED_CLASS} ${disabled ? 'disabled' : ''}`
        }
        type="button"
        onClick={async () => {
          if (!isLoggedIn) navigate('/login');
          setDisabled(true);
          article.favorited ? await unfavorite() : await favorite();
          setDisabled(false);
        }}
      >
        <i className="ion-heart"></i>
        &nbsp; {article.favorited ? 'Unfavorite' : 'Favorite'} Post
        <span className="counter">({article.favoritesCount})</span>
      </button>
    </>
  );
};

export default ArticleAction;
