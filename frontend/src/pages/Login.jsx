import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", formData);
      const token = res.data.access_token;
      localStorage.setItem("token", token);
      setTimeout(() => {
        navigate("/dashboard");
      }, 100);
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left desktop-branding">
        <img src={logo} alt="WellAware Logo" className="login-logo" />
        <div className="orange-text">
          <h1>WellAware</h1>
        </div>
        <p>Monitor your oil well systems with confidence.</p>
      </div>

      <div className="login-right">
        <div className="mobile-branding-banner">
          <img src={logo} alt="WellAware Logo" className="login-logo" />
          <div className="orange-text">
            <h1>WellAware</h1>
          </div>
          <p>Monitor your oil well systems with confidence.</p>
        </div>

        <div className="login-form-card">
          <h2>Login to Your Account</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <div className="input-with-icon">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="toggle-password" onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M3.98 8.223A10.477 10.477 0 001.5 12s3.75 6.75 9.75 6.75a9.724 9.724 0 004.7-1.29M21.75 12s-3.75-6.75-9.75-6.75a9.75 9.75 0 00-2.564.333" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-6.75 9.75-6.75 9.75 6.75 9.75 6.75-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </span>
            </div>
            {error && <p className="login-error">{error}</p>}
            <button type="submit">Login</button>
          </form>
          <p className="login-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
