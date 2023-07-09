import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/authStore.js";
import "../assets/css/authentication.css";
import Logo from "../assets/images/icon.png";
export default function LogIn() {
  const [showMessage, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userDetails = useSelector((state) => state?.auth?.user);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const logInStatus = await res.json();
    if (res.ok) {
      Cookies.set("token", logInStatus.token);
      navigate("/");
      Cookies.set("id", logInStatus.user._id);
      dispatch(getUser(logInStatus.user));
    } else {
      setMessage(logInStatus.message);
    }
  };
  const redirectSignUp = () => {
    navigate("/register");
  };
  return (
    <>
      <img src={Logo} style={{ width: "20%" }} />
      <div className="container">
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h1 style={{ color: "#2da1cb" }}>Sign in</h1>
            <input type="email" placeholder="Email" id="email" name="email" />
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
            />
            {showMessage !== "" && (
              <h5 style={{ fontWeight: "600", color: "#831010" }}>
                {showMessage}
              </h5>
            )}
            <button className="signupbutton">Sign In</button>
            <a href="/login">Forgot your password?</a>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>
                Enter your personal details
                <br />
                and start journey with us
              </p>
              <button
                className="signupbutton ghost"
                id="signUp"
                onClick={redirectSignUp}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
