import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./page.css";

function Home() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); // ✅ Hook MUST be at top level

  useEffect(() => {
    fetch("https://carsnest.onrender.com/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  const filteredCars = cars.filter((car) =>
    (car.name?.toLowerCase() || "").includes(search.toLowerCase())
  );

  const handleHomeClick = () => {
    navigate("/");           // Navigate to home
    window.location.reload(); // Force page reload (if needed)
  };

  return (
    <div className="app">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search car models..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="button" aria-label="Search">🔍</button>
      </div>

      {filteredCars.length === 0 ? (
        <div className="no-results">
          <h2>No cars found matching your search.</h2>
          <button onClick={handleHomeClick} className="nav-btn">Home</button>
        </div>
      ) : (
        <>
          <div className="card-container">
            {filteredCars.map((car) => (
              <Link key={car._id} to={`/car/${car._id}`}>
                <div className="card">
                  <h2>{car.name}</h2>
                  <p className="details">🛞 Year: {car.year}</p>
                  <p className="details">⛽ Fuel: {car.fuel_type}</p>
                  <p className="details">⚙️ Transmission: {car.transmission}</p>
                  <p className="details">💰 Price: ₹{car.price.toLocaleString()}</p>
                  <p className="details">🚗 KMs Driven: {car.kms_driven.toLocaleString()} km</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="footer-container">
            <footer className="footer">
              © 2025 CARS NEST. All rights reserved.<br />
              Follow us on Instagram @carsnest
            </footer>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;



// src/pages/Home.js
// /pages/Home.js
// src/pages/Home.js
// src/pages/Home.js

/*
import React, { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import { auth } from "../firebase";
import "./page.css";

function Home() {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    fetch("http://localhost:4000/employees")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        setFiltered(data);
      })
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  useEffect(() => {
    let result = [...employees];
    if (search) {
      result = result.filter((emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (departmentFilter) {
      result = result.filter((emp) => emp.department === departmentFilter);
    }
    if (statusFilter) {
      result = result.filter((emp) => emp.status === statusFilter);
    }
    setFiltered(result);
  }, [search, departmentFilter, statusFilter, employees]);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/employees/${id}`, { method: "DELETE" });
    setEmployees(employees.filter((e) => e._id !== id));
  };

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="p-6">
      <div className="header">
        <div className="logo">Employee Manager</div>
        {user && (
          <div className="user-info">
  <span className="welcome-text">Welcome, {user.displayName}</span>
  <button className="logout-btn" onClick={handleLogout}>
    Logout
  </button>
</div>

        )}
      </div>

      <div className="filters">
        <div className="input-group">

          <input
            type="text"
            placeholder="Search name/email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
            <option value="Marketing">Marketing</option>
            <option value="Admin">Admin</option>
            <option value="Design">Design</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button onClick={() => {
          setEditEmployee(null);
          setShowForm(true);
        }}>
          + Add Employee
        </button>
      </div>

      <div className="grid">
        {filtered.map((emp) => (
          <div key={emp._id} className="card">
            <h2>{emp.name}</h2>
            <p>{emp.email}</p>
            <p>{emp.role}</p>
            <p>{emp.department}</p>
            <span className={`status ${emp.status === "Active" ? "active" : "inactive"}`}>
              {emp.status}
            </span>
            <div className="actions">
              <button onClick={() => {
                setEditEmployee(emp);
                setShowForm(true);
              }}>
                Edit
              </button>
              <button onClick={() => handleDelete(emp._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <EmployeeForm
          employee={editEmployee}
          onClose={() => setShowForm(false)}
          onSave={(newEmp) => {
            setShowForm(false);
            if (editEmployee) {
              setEmployees((prev) =>
                prev.map((e) => (e._id === newEmp._id ? newEmp : e))
              );
            } else {
              setEmployees((prev) => [...prev, newEmp]);
            }
          }}
        />
      )}
    </div>
  );
}

export default Home;
*/