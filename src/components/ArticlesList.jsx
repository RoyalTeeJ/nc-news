import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import { useSearchParams } from "react-router-dom";
import { getArticles } from "../utils/api.js";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allArticlesLoaded, setAllArticlesLoaded] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "DESC";

  useEffect(() => {
    setLoading(true);
    setAllArticlesLoaded(false);

    getArticles(1, sort_by, order)
      .then((articles) => {
        setArticles(articles);
        setLoading(false);
        setPage(1);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [sort_by, order]);

  const loadMoreArticles = () => {
    setLoadingMore(true);

    const nextPage = page + 1;

    getArticles(nextPage, sort_by, order)
      .then((newArticles) => {
        if (newArticles.length < 10) {
          setAllArticlesLoaded(true);
        }

        setArticles((prev) => [...prev, ...newArticles]);
        setPage(nextPage);
        setLoadingMore(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingMore(false);
      });
  };

  const handleSortChange = (newSortBy) => {
    setSearchParams({ sort_by: newSortBy, order });
  };

  const toggleOrder = () => {
    const newOrder = order === "DESC" ? "ASC" : "DESC";
    setSearchParams({ sort_by, order: newOrder });
  };

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1 className="title-homepage">Our Articles</h1>
      {/* Sorting Controls */}
      <div className="sort-controls">
        <p>Sort by: </p>
        <select
          id="sort-select"
          name="sort_by"
          value={sort_by}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
        <button className="toggle-order-btn" onClick={toggleOrder}>
          {order === "DESC" ? "⬇ DESC" : "⬆ ASC"}
        </button>
      </div>
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
