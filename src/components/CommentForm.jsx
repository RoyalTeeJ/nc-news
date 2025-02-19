import { useState } from "react";
import { postComment } from "../utils/api";

const CommentForm = ({ article_id, addNewComment }) => {
  const [newComment, setNewComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setCommentError("Comment cannot be empty.");
      return;
    }

    setPosting(true);
    setCommentError(null);
    setSuccessMessage(null);

    postComment(article_id, "jessjelly", newComment)
      .then((newCommentData) => {
        addNewComment(newCommentData);
        setNewComment("");
        setSuccessMessage("Comment posted successfully!");
      })
      .catch(() => {
        setCommentError("Failed to post comment. Please try again.");
      })
      .finally(() => {
        setPosting(false);
      });
  };

  return (
    <div>
      <h2>Leave a Comment</h2>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder=" Write your comment here..."
          className="comment-input"
          disabled={posting}
        />
        <div className="submit-btn-wrapper">
          <button type="submit" className="submit-btn" disabled={posting}>
            {posting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>
      {commentError && <p className="error">{commentError}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default CommentForm;
