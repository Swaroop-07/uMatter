import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/authentication.css";
import Logo from "../assets/images/icon.png";
export default function Register() {
  const [showErrorMessage, setAlreadyExists] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const form = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data1 = await res.json();
    if (res.ok) {
      navigate("/login");
    }
    setAlreadyExists(data1.message);
  };

  const redirectLogIn = () => {
    navigate("/login");
  };
  return (
    <>
    <img src={Logo} style={{ width: "20%" }} />
    <div className="container">
      <div className="form-container sign-in-container">
        <form onSubmit={handleSubmit}>
          <h1 style={{ color: "#2da1cb" }}>Create Account</h1>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            id="firstName"
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            id="lastName"
          />
          <input type="email" placeholder="Email" name="email" id="email" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
          />
          {showErrorMessage !== "" && (
            <h5 style={{ fontWeight: "600", color: "#831010" }}>
              {showErrorMessage}
            </h5>
          )}
          <button className="signupbutton">Sign Up</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button
              className="signupbutton ghost"
              id="signIn"
              onClick={redirectLogIn}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
