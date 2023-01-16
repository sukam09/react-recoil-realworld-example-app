import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { CommentProps } from '../../types';
import { convertToDate } from '../../utils';
import { userAtom } from '../../atom';

const Comment = ({
  comment,
  removeComment,
}: {
  comment: CommentProps;
  removeComment: (id: number) => Promise<void>;
}) => {
  const username = useRecoilValue(userAtom).username;

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link
          to={`/profile/${comment.author.username}`}
          className="comment-author"
        >
          <img src={comment.author.image} className="comment-author-img" />
        </Link>{' '}
        <Link
          to={`/profile/${comment.author.username}`}
          className="comment-author"
        >
          {comment.author.username}
        </Link>
        <span className="date-posted">{convertToDate(comment.createdAt)}</span>
        {comment.author.username === username ? (
          <span className="mod-options">
            <i
              className="ion-trash-a"
              onClick={() => removeComment(comment.id)}
            ></i>
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Comment;
