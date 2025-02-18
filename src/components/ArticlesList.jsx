import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../utils/api.js";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticles()
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="articles-container">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticlesList;
