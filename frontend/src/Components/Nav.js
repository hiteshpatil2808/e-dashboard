import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // When clicking the profile button, toggle the dropdown and stop the event from bubbling.
  const handleProfileClick = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking anywhere outside of the dropdown.
  useEffect(() => {
    const handleDocumentClick = (e) => {
      // If dropdownRef exists and the click target is not inside it, close the dropdown.
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img
            alt="logo"
            className="logo"
            src="https://marketplace.canva.com/EAGQ1aYlOWs/1/0/1600w/canva-blue-colorful-illustrative-e-commerce-online-shop-logo-bHiX_0QpJxE.jpg"
          />
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/">Products</Link>
          <Link to="/add">Add Product</Link>
          {auth ? (
            <div className="dropdown" ref={dropdownRef}>
              {/* The button toggles the dropdown. It has its own arrow via CSS */}
              <button className="profile-btn" onClick={handleProfileClick}>
                {JSON.parse(auth).name}
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                    Profile
                  </Link>
                  <button onClick={logout} className="logout-btn">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
