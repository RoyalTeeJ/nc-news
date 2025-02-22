import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticlesList from "./components/ArticlesList";
import ArticlePage from "./components/ArticlePage";
import Navbar from "./components/NavBar";
import TopicPage from "./components/TopicPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route path="/topics/:topic_slug" element={<TopicPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
