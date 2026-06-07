import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    setErrorMessage("");
    try {
      const resp = await axios.post("http://localhost:5000/api/login", {
        username: username,
        password: password,
      });
      localStorage.setItem("currentUser", JSON.stringify(resp.data.user));
      localStorage.setItem("token", resp.data.token);
      setIsloading(false);
      navigate(`/`);
    } catch (error) {
      console.error(error);
      setIsloading(false);
      if (error.response && typeof error.response.data === "string") {
        setErrorMessage(error.response.data);
      } else if (error.response?.data?.msg) {
        setErrorMessage(error.response.data.msg);
      } else {
        setErrorMessage("Something went wrong. Please check your credentials.");
      }
    }
  };

  return (
    <div className="whole">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="form__title">Welcome Back</h1>
          {errorMessage && (
            <div className="form__message form__message--error">
              {errorMessage}
            </div>
          )}
          <div className="form__input-group">
            <input
              type="text"
              className="form__input"
              autoFocus
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form__input-group">
            <input
              type="password"
              className="form__input"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="form__button" type="submit" disabled={isloading}>
            {isloading ? "Logging in..." : "Login"}
          </button>
          <Link to="/">
            <p className="form_link">Don't have an account? Register</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
