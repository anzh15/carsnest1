import React, { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import "./login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleEmailLogin = () => {
    // Placeholder function (you can integrate Firebase email/password auth later)
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Email login logic not implemented yet.");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Log in to your account</h2>

      <div className="login-buttons">
        {/* Google Login */}
        <button className="login-btn google-btn" onClick={handleGoogleSignIn}>
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
          />
          Sign in with Google
        </button>

        {/* Divider */}
        <div className="divider">or</div>

        {/* Email and Password Fields */}
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Email Login Button */}
        <button className="login-btn email-btn" onClick={handleEmailLogin}>
          Sign in with Email
        </button>
      </div>
    </div>
  );
};

export default Login;

