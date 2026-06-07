import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    setErrorMessage("");
    try {
      await axios.post("http://localhost:5000/api/signup", {
        username: username,
        email: email,
        password: password,
        name: name,
      });
      setIsloading(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
      setIsloading(false);
      if (error.response && typeof error.response.data === "string") {
        setErrorMessage(error.response.data);
      } else if (error.response?.data?.msg) {
        setErrorMessage(error.response.data.msg);
      } else {
        setErrorMessage("Signup failed. Please try a different username or email.");
      }
    }
  };

  return (
    <div className="whole">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="form__title">Create Account</h1>
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
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form__input-group">
            <input
              type="text"
              className="form__input"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form__input-group">
            <input
              type="email"
              className="form__input"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {isloading ? "Signing up..." : "Signup"}
          </button>
          <Link to="/login">
            <p className="form_link">Already have an account? Login</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
