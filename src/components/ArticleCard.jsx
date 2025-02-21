import { Link } from "react-router-dom";
import { voteOnArticle } from "../utils/api";
import { useState } from "react";

const ArticleCard = ({ article }) => {
  const [voteChange, setVoteChange] = useState(0);
  const [voteError, setVoteError] = useState(null);

  const handleVote = (change) => {
    setVoteChange((prev) => prev + change);
    setVoteError(null);

    voteOnArticle(article.article_id, change).catch(() => {
      setVoteChange((prev) => prev - change);
      setVoteError("Failed to update vote.");
    });
  };

  return (
    <div className="article-card">
      <Link to={`/articles/${article.article_id}`} className="article-link">
        <img
          src={article.article_img_url}
          alt={article.title}
          className="article-image"
        />
        <div className="article-content">
          <h2 className="article-title">{article.title}</h2>
          <p className="article-info">
            By {article.author} | {new Date(article.created_at).toDateString()}
          </p>
          <p className="article-info">Topic: {article.topic}</p>
        </div>
      </Link>

      <div className="article-stats">
        <div className="vote-section">
          <button className="vote-btn upvote" onClick={() => handleVote(1)}>
            👍
          </button>
          <span className="vote-count">{article.votes + voteChange}</span>
          <button className="vote-btn downvote" onClick={() => handleVote(-1)}>
            👎
          </button>
        </div>
        <Link
          to={`/articles/${article.article_id}#comments`}
          className="comment-count"
        >
          💬 {article.comment_count}
        </Link>
      </div>
      {voteError && <p className="vote-error">{voteError}</p>}
    </div>
  );
};

export default ArticleCard;
