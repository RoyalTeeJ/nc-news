import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { getArticlesByTopic } from "../utils/api";

const TopicPage = () => {
  const { topic_slug } = useParams();
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
    getArticlesByTopic(topic_slug, 1, sort_by, order)
      .then((articlesData) => {
        setArticles(articlesData);
        setLoading(false);
        setPage(1);
        if (articlesData.length < 10) setAllArticlesLoaded(true);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [topic_slug, sort_by, order]);

  const loadMoreArticles = () => {
    setLoadingMore(true);
    const nextPage = page + 1;

    getArticlesByTopic(topic_slug, nextPage, sort_by, order)
      .then((newArticles) => {
        if (newArticles.length < 10) setAllArticlesLoaded(true);

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
    <div className="topic-page">
      <h1>Articles about {topic_slug}</h1>

      {/* Sorting Controls */}
      <div className="sort-controls">
        <label htmlFor="sort-select">Sort by: </label>
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

      {/* Articles List */}
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
    </div>
  );
};

export default TopicPage;
