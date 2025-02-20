import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { getCommentsByArticleId } from "../utils/api.js";
import { useState } from "react";

const CommentsSection = ({ article_id, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allCommentsLoaded, setAllCommentsLoaded] = useState(false);

  const toggleComments = () => {
    if (!showComments) {
      setCommentsLoading(true);
      getCommentsByArticleId(article_id)
        .then((commentsData) => {
          setComments(commentsData);
          setCommentsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setCommentsLoading(false);
        });
    }
    setShowComments((prev) => !prev);
  };

  const addNewComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const removeComment = (comment_id) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== comment_id)
    );
  };

  const loadMoreComments = () => {
    setLoadingMore(true);
    getCommentsByArticleId(article_id, page + 1)
      .then((newComments) => {
        if (newComments.length < 10) {
          setAllCommentsLoaded(true);
        }

        setComments((prev) => [...prev, ...newComments]);
        setPage((prev) => prev + 1);
        setLoadingMore(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingMore(false);
      });
  };

  return (
    <section>
      {/* Comments Toggle */}
      <button className="comments-toggle" onClick={toggleComments}>
        {showComments ? "Hide Comments ⬆️" : "Show Comments ⬇️"}
      </button>

      {/* Comments Section and Comment Form */}
      {showComments && (
        <>
          <CommentForm
            article_id={article_id}
            addNewComment={addNewComment}
            currentUser={currentUser}
          />

          <div className="comments-container">
            {commentsLoading ? (
              <p>Loading comments...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <CommentCard
                  key={comment.comment_id}
                  comment={comment}
                  currentUser={currentUser}
                  removeComment={removeComment}
                />
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </div>

          {!allCommentsLoaded && (
            <div className="show-more-container">
              <button
                className="show-more-btn"
                onClick={loadMoreComments}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Show More"}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default CommentsSection;
