import { Link } from "react-router-dom";
import { CommentProps } from "@/pages/Article";

const Comment = ({ body }: CommentProps) => {
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{body}</p>
      </div>
      <div className="card-footer">
        <Link to="" className="comment-author">
          <img
            src="http://i.imgur.com/Qr71crq.jpg"
            className="comment-author-img"
          />
        </Link>{" "}
        <Link to="" className="comment-author">
          Jacob Schmidt
        </Link>
        <span className="date-posted">Dec 29th</span>
      </div>
    </div>
  );
};

export default Comment;
