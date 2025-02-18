import axios from "axios";

const api = axios.create({
  baseURL: "https://royalteej-be-nc-news.onrender.com/api",
});

export const getArticles = () => {
  return api.get("/articles").then((res) => res.data.article);
};

export const getArticleById = (article_id) => {
  return api.get(`/articles/${article_id}`).then((res) => res.data.article);
};
