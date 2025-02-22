import { useState, useEffect, useRef } from "react";
import ArticleCard from "./ArticleCard";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getArticles } from "../utils/api.js";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allArticlesLoaded, setAllArticlesLoaded] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [selectedSort, setSelectedSort] = useState("created_at");
  const [selectedOrder, setSelectedOrder] = useState("DESC");

  const filterRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedSort && selectedOrder) {
      setLoading(true);
      setAllArticlesLoaded(false);

      getArticles(1, selectedSort, selectedOrder)
        .then((articles) => {
          setArticles(articles);
          setLoading(false);
          setPage(1);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [selectedSort, selectedOrder]);

  const handleSortSelection = (sort_by) => {
    setSelectedSort(sort_by);
    setSelectedOrder("");
  };

  const handleOrderSelection = (order) => {
    setSelectedOrder(order);

    if (selectedSort) {
      setSearchParams({ sort_by: selectedSort, order });
      setShowFilter(false);
    }
  };

  const loadMoreArticles = () => {
    setLoadingMore(true);

    const nextPage = page + 1;

    getArticles(nextPage, selectedSort, selectedOrder)
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

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="articles-background">
      <div className="articlesPages">
        <div className="homepage-title">
          <h1 className="homepage-title-heading">
            <span className="homepage-title-heading-primary">Our</span>
            <span className="homepage-title-heading-secondary">Articles</span>
          </h1>
        </div>
        {/* 🔹 Filter Button */}
        <div className="filter-container" ref={filterRef}>
          <button
            className="filter-btn"
            onClick={() => setShowFilter(!showFilter)}
          >
            🔍 Filter
          </button>

          {showFilter && (
            <div className="filter-dropdown">
              {/* 🔹 Sort By Section */}
              <div className="filter-section">
                <h3>Sort By:</h3>
                <button
                  className={`filter-option ${
                    selectedSort === "created_at" ? "active" : ""
                  }`}
                  onClick={() => handleSortSelection("created_at")}
                >
                  📅 Date
                </button>
                <button
                  className={`filter-option ${
                    selectedSort === "comment_count" ? "active" : ""
                  }`}
                  onClick={() => handleSortSelection("comment_count")}
                >
                  💬 Comments
                </button>
                <button
                  className={`filter-option ${
                    selectedSort === "votes" ? "active" : ""
                  }`}
                  onClick={() => handleSortSelection("votes")}
                >
                  👍 Votes
                </button>
              </div>

              {/* 🔹 Divider Line */}
              <div className="divider"></div>

              {/* 🔹 Order By Section (only shows if Sort By is selected) */}
              {selectedSort && (
                <div className="filter-section">
                  <h3>Order By:</h3>
                  {selectedSort === "created_at" ? (
                    <>
                      <button
                        className={`filter-option ${
                          selectedOrder === "DESC" ? "active" : ""
                        }`}
                        onClick={() => handleOrderSelection("DESC")}
                      >
                        Newest
                      </button>
                      <button
                        className={`filter-option ${
                          selectedOrder === "ASC" ? "active" : ""
                        }`}
                        onClick={() => handleOrderSelection("ASC")}
                      >
                        Oldest
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className={`filter-option ${
                          selectedOrder === "DESC" ? "active" : ""
                        }`}
                        onClick={() => handleOrderSelection("DESC")}
                      >
                        Greatest
                      </button>
                      <button
                        className={`filter-option ${
                          selectedOrder === "ASC" ? "active" : ""
                        }`}
                        onClick={() => handleOrderSelection("ASC")}
                      >
                        Lowest
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 🔹 Post Article Button */}
        <div className="post-article-container">
          <button
            className="post-article-btn"
            onClick={() => navigate("/post-article")}
          >
            📝 Post an Article
          </button>
        </div>
        {/* ArticleCard section */}
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
    </div>
  );
};

export default ArticlesList;
