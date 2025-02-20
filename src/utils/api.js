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

export const getCommentsByArticleId = (article_id) => {
  return api
    .get(`/articles/${article_id}/comments`)
    .then((res) => res.data.comments);
};

export const voteOnArticle = (article_id, voteChange) => {
  return api
    .patch(`/articles/${article_id}`, { inc_votes: voteChange })
    .then((res) => res.data);
};

export const voteOnComment = (comment_id, voteChange) => {
  return api
    .patch(`/comments/${comment_id}`, { inc_votes: voteChange })
    .then((res) => res.data);
};

export const postComment = (article_id, username, body) => {
  return api
    .post(`/articles/${article_id}/comments`, { username, body })
    .then((res) => res.data.comment);
};

export const deleteComment = (comment_id) => {
  return api.delete(`/comments/${comment_id}`).then((res) => res.data);
};
