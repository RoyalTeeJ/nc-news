const CommentCard = ({ comment }) => {
  return (
    <div className="comment-card">
      <p className="comment-author">
        <strong>{comment.author}</strong> says:
      </p>
      <p className="comment-body">{comment.body}</p>
      <p className="comment-meta">
        {new Date(comment.created_at).toLocaleDateString()} | 👍 {comment.votes}
      </p>
    </div>
  );
};

export default CommentCard;
