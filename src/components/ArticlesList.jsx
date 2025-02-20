import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { getArticles } from "../utils/api.js";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allArticlesLoaded, setAllArticlesLoaded] = useState(false);

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

  const loadMoreArticles = () => {
    setLoadingMore(true);
    getArticles(page + 1)
      .then((newArticles) => {
        if (newArticles.length < 10) {
          setAllArticlesLoaded(true);
        }

        setArticles((prev) => [...prev, ...newArticles]);
        setPage((prev) => prev + 1);
        setLoadingMore(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingMore(false);
      });
  };

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1 className="title-homepage">Our Articles</h1>
      <div className="articles-container">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
      {!allArticlesLoaded && (
        <div className="show-more-container">
          <button
            className="show-more-btn"
            onClick={loadMoreArticles}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "Show More"}
          </button>
        </div>
      )}
    </>
  );
};

export default ArticlesList;
