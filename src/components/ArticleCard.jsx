import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
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
          <div className="article-stats">
            <span>👍 {article.votes}</span>
            <span>💬 {article.comment_count}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
