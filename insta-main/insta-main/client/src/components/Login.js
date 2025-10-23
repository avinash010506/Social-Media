import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsloading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const resp = await axios.post("http://localhost:5000/api/login", {
        username: username,
        password: password,
      });
      setIsloading(false);
      navigate(`/user/${username}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="whole">
      <div className="container">
        <form className="form " id="createAccount" onSubmit={handleSubmit}>
          <h1 className="form__title">Login</h1>
          <div className="form__message form__message--error"></div>
          <div className="form__input-group">
            <input
              type="text"
              id="signupUsername"
              className="form__input"
              autoFocus
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form__input-group">
            <input
              type="password"
              className="form__input"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isloading ? (
            <>
              <button
                className="form__button"
                disabled
                style={{ cursor: "progress" }}
              >
                Logging in
              </button>
            </>
          ) : (
            <>
              <button className="form__button">Login</button>
            </>
          )}
          <Link to="/">
            <p className="form_link">Don't have an account ? Register</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
