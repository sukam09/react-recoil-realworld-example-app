import { Link } from "react-router-dom";
import { CommentProps } from "@shared/type";
import convertToDate from "@utils/convertToDate";

const Comment = ({
  id,
  createdAt,
  body,
  author: { username, image },
}: CommentProps) => {
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{body}</p>
      </div>
      <div className="card-footer">
        <Link to={`/profile/${username}`} className="comment-author">
          <img src={image} className="comment-author-img" />
        </Link>{" "}
        <Link to={`/profile/${username}`} className="comment-author">
          {username}
        </Link>
        <span className="date-posted">{convertToDate(createdAt)}</span>
      </div>
    </div>
  );
};

export default Comment;
