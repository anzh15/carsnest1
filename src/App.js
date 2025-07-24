
import React from "react";
import "./firebase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CarDetails from "./components/CarDetails";
import Sell from "./pages/sell";
import Login from './pages/login';
import About from './pages/about';
import NavBar from "./components/navbar";
import MyCars from "./pages/MyCars";

function App() {
  return (
   <Router>
     <NavBar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/sell" element={<Sell />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/mycars" element={<MyCars />} />
      </Routes>
    </Router>
  );
}



export default App;

// src/App.js
/*
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
*/