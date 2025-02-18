import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticlesList from "./components/ArticlesList";
import ArticlePage from "./components/ArticlePage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
};

export default App;
