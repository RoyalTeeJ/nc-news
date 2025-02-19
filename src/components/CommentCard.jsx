import { useState } from "react";
import { voteOnComment } from "../utils/api";

const CommentCard = ({ comment }) => {
  const [voteChange, setVoteChange] = useState(0);
  const [voteError, setVoteError] = useState(null);

  const handleVote = (change) => {
    setVoteChange((prev) => prev + change);
    setVoteError(null);

    voteOnComment(comment.comment_id, change).catch(() => {
      setVoteChange((prev) => prev - change);
      setVoteError("Failed to update vote.");
    });
  };

  return (
    <div className="comment-card">
      <p className="comment-author">
        <strong>{comment.author}</strong> says:
      </p>
      <p className="comment-body">{comment.body}</p>
      <p className="comment-meta">
        <strong>Posted on:</strong>{" "}
        {new Date(comment.created_at).toLocaleDateString()}
      </p>

      <div className="vote-section">
        <button className="vote-btn upvote" onClick={() => handleVote(1)}>
          👍
        </button>
        <button className="vote-btn downvote" onClick={() => handleVote(-1)}>
          👎
        </button>
        <span className="vote-count">{comment.votes + voteChange}</span>
      </div>
      {voteError && <p className="vote-error">{voteError}</p>}
    </div>
  );
};

export default CommentCard;
