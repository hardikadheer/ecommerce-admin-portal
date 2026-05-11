import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, hardcoded credentials for testing
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true"); // Save login state
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-icon">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2l9 4.9v9.8L12 22l-9-5.3V6.9L12 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="login-title">Admin Panel</h2>
        <p className="login-subtitle">Sign in to your admin account</p>

        <form onSubmit={handleSubmit}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
