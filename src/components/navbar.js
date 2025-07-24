import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import "./navbar.css";

function NavBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="navbar-container">
      <div className="navbar-brand">
        <span>CARS NEST</span>
      </div>
      <div className="navbar-buttons">
        <Link to="/" className="nav-btn">Home</Link>
        <Link to="/sell" className="nav-btn">Sell</Link>
        <Link to="/about" className="nav-btn">About</Link>
        <Link to="/mycars" className="nav-btn" >My Cars</Link>
        {user ? (
          <>
            <span className="welcome-text">Welcome, {user.displayName || user.email}</span>
            <button className="nav-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="nav-btn">Login</Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
