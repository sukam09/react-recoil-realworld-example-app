import { Link } from "react-router-dom";
import { CommentProps } from "@/shared/type";
import { TEST_IMAGE } from "@/shared/dummy";

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
          {/* FIXME: API error */}
          {/* <img src={image} className="comment-author-img" /> */}
          <img src={TEST_IMAGE} className="comment-author-img" />
        </Link>{" "}
        <Link to={`/profile/${username}`} className="comment-author">
          {username}
        </Link>
        <span className="date-posted">{createdAt}</span>
      </div>
    </div>
  );
};

export default Comment;
