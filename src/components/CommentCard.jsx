import { useState } from "react";
import { voteOnComment, deleteComment } from "../utils/api";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const CommentCard = ({ comment, removeComment, currentUser }) => {
  const [voteChange, setVoteChange] = useState(0);
  const [voteError, setVoteError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    setDeleteError(null);

    deleteComment(comment.comment_id)
      .then(() => {
        removeComment(comment.comment_id);
      })
      .catch(() => {
        setDeleteError("Failed to delete comment. Please try again.");
        setDeleting(false);
      });
  };

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

      {/* Show delete button only if user is the author */}
      {currentUser === comment.author && (
        <button
          className="delete-btn"
          onClick={() => setShowModal(true)}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "🗑 Delete Comment"}
        </button>
      )}

      {deleteError && <p className="error">{deleteError}</p>}

      {/* Show deletion confirmation*/}
      {showModal && (
        <DeleteConfirmationModal
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}

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
