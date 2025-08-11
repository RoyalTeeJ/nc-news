# 📰 NC News Frontend

A modern, responsive **React** application for browsing, sorting, and interacting with news articles, powered by the [NC News API](https://royalteej-be-nc-news.onrender.com).

This app provides an intuitive interface for reading articles, posting new ones, voting, and filtering by topic — all in real-time.

---

## 🚀 Features

### 📄 Articles
- View a paginated list of articles.
- Background fades from **black to orange** on article-related pages.

### 🔍 Filtering & Sorting
- **Filter Button** with dropdown menu:
  - **Sort By**: 📅 Date, 💬 Comments, 👍 Votes
  - **Order By**: Oldest / Newest / Greatest / Lowest (dynamic based on selection)
- Highlights selected filter for clarity.
- Only loads when both sort and order are selected.

### 🗂 Topic Navigation
- Dropdown menu for **Explore Topics**.
- Opens vertically and hides when clicking outside.
- Dedicated topic pages with the same filter functionality.

### 💬 Comments
- View article comments.
- Add new comments.
- Delete your own comments (with confirmation).
- Vote on comments.

### 📝 Posting Articles
- Modal-based form for adding a new article.
- Returns to the main page with the newly posted article at the top.

### 📱 Responsive Design
- Sticky header with mobile-friendly layout.
- Touch-friendly dropdown menus.
- Fully responsive across devices.

---

## 🛠 Tech Stack

| **Category** | **Tech** |
|--------------|----------|
| Frontend     | React, React Router |
| HTTP Client  | Axios |
| Backend API  | [NC News API](https://royalteej-be-nc-news.onrender.com) |
| Styling      | Custom CSS |

---

## 📦 Installation & Setup

1️⃣ **Clone the repository**
```bash
git clone <your-repo-url>
cd nc-news
```

2️⃣ **Install dependencies**
```bash
npm install
```

3️⃣ **Run the development server**

- If using Vite:
```bash
npm run dev
```
- If using Create React App:
```bash
npm start
```
---

