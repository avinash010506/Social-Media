import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <div
        style={{
          margin:"20px 50px",
          borderBottom: "2px solid black",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Link to="/">Sign up</Link>
        <Link to="/login">Login</Link>
      </div>
    </>
  );
}
