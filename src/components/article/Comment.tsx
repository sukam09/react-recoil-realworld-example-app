import { Link } from "react-router-dom";
import { CommentProps } from "../../types";
import { convertToDate } from "../../utils";

const Comment = ({ comment }: { comment: CommentProps }) => {
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
        </Link>{" "}
        <Link
          to={`/profile/${comment.author.username}`}
          className="comment-author"
        >
          {comment.author.username}
        </Link>
        <span className="date-posted">{convertToDate(comment.createdAt)}</span>
      </div>
    </div>
  );
};

export default Comment;
