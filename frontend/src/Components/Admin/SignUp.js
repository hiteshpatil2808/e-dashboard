import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  async function collectData() {
    let result = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();

    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    navigate("/");
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* Brand / Logo Section */}
        <h2 className="brand-title">My E-Commerce</h2>

        <h2 className="signup-title">Create an Account</h2>

        {/* Name Input */}
        <input
          type="text"
          className="signup-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />

        {/* Email Input */}
        <input
          type="email"
          className="signup-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />

        {/* Password Input */}
        <input
          type="password"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button type="button" className="signup-button" onClick={collectData}>
          Sign Up
        </button>

        {/* Already have account? Link to Login */}
        <div className="switch-auth">
          <span>Already have an account?</span>{" "}
          <Link to="/login" className="auth-link">Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
