import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../utils/api";

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
    <nav className="navbar">
      <Link to="/" className="nav-link home-link">
        🏠 Home
      </Link>

      {/* Dropdown Menu */}
      <div className="dropdown" ref={dropdownRef}>
        <button
          className="dropdown-btn"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          📂 Explore Topics ▼
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
                  {topic.slug}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
