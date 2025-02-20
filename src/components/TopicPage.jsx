import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  useEffect(() => {
    getArticlesByTopic(topic_slug, 1)
      .then((articlesData) => {
        setArticles(articlesData);
        setLoading(false);
        if (articlesData.length < 10) setAllArticlesLoaded(true);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [topic_slug]);

  const loadMoreArticles = () => {
    setLoadingMore(true);
    const nextPage = page + 1;

    getArticlesByTopic(topic_slug, nextPage)
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

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="topic-page">
      <h2>Articles about {topic_slug}</h2>
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
