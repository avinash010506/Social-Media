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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      await axios.post("http://localhost:5000/api/signup", {
        username: username,
        email: email,
        password: password,
        name:name,
      });
      setIsloading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="whole">
      <div className="container">
        <form className="form " id="createAccount" onSubmit={handleSubmit}>
          <h1 className="form__title">Create Account</h1>
          <div className="form__message form__message--error"></div>
          <div className="form__input-group">
            <input
              type="text"
              className="form__input"
              autoFocus
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form__input-group">
            <input
              type="text"
              id="signupUsername"
              className="form__input"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form__input-group">
            <input
              type="email"
              className="form__input"
              placeholder="Email Address"
              required
              onChange={(e) => setEmail(e.target.value)}
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
                Signing up
              </button>
            </>
          ) : (
            <>
              <button className="form__button">Signup</button>
            </>
          )}
          <Link to="/login">
            <p className="form_link">Already have an account ? Login</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
