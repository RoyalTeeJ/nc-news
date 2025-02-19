import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArticleById,
  getCommentsByArticleId,
  voteOnArticle,
} from "../utils/api";
import CommentCard from "./CommentCard";

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voteChange, setVoteChange] = useState(0);
  const [voteError, setVoteError] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    getArticleById(article_id)
      .then((articleData) => {
        setArticle(articleData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [article_id]);

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

  const handleVote = (change) => {
    setVoteChange((prev) => prev + change);
    setVoteError(null);

    voteOnArticle(article_id, change).catch(() => {
      setVoteChange((prev) => prev - change);
      setVoteError("Failed to update vote. Please try again.");
    });
  };

  if (loading) return <p className="loading">Loading article...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="article-container">
      <h1>{article.title}</h1>
      <p>
        <strong>By:</strong> {article.author}
      </p>
      <img
        src={article.article_img_url}
        alt={article.title}
        className="article-image"
      />
      <p>{article.body}</p>
      <h2>Article Votes:</h2>
      <span className="vote-count">{article.votes + voteChange}</span>
      <div className="vote-section-articlepage">
        <button
          className="vote-btn-articlepage upvote"
          onClick={() => handleVote(1)}
        >
          👍
        </button>
        <button
          className="vote-btn-articlepage downvote"
          onClick={() => handleVote(-1)}
        >
          👎
        </button>
      </div>
      {voteError && <p className="vote-error">{voteError}</p>}

      <h2>Comments</h2>
      <p>
        <strong>Total Comments:</strong> {article.comment_count}
      </p>

      <button className="comments-toggle" onClick={toggleComments}>
        {showComments ? "Hide Comments ⬆️" : "Show Comments ⬇️"}
      </button>

      {showComments && (
        <div className="comments-container">
          {commentsLoading ? (
            <p>Loading comments...</p>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard key={comment.comment_id} comment={comment} />
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
