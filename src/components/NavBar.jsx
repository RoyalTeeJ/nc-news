import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../utils/api";
import "./Navbar.css";

const Navbar = () => {
  const [topics, setTopics] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    getTopics()
      .then((topicsData) => setTopics(topicsData))
      .catch((err) => console.error("Error fetching topics:", err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTopicClick = () => {
    setShowDropdown(false);
  };

  return (
    <header className="sticky-header">
      <div className="header-container">
        {/* 🔹 Logo */}
        <div className="logo">
          <Link to="/">NC News</Link>
        </div>

        {/* 🔹 Navigation Menu */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            {/* 🔹 Dropdown Menu for Topics */}
            <li className="dropdown" ref={dropdownRef}>
              <button
                className="dropdown-btn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Explore Topics ▼
              </button>
              {showDropdown && (
                <ul className="dropdown-menu">
                  {topics.map((topic) => (
                    <li key={topic.slug}>
                      <Link
                        to={`/topics/${topic.slug}`}
                        className="dropdown-item"
                        onClick={handleTopicClick}
                      >
                        🔹 {topic.slug}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
