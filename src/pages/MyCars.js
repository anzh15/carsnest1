import React, { useState, useEffect } from 'react';
import './mycars.css';

function MyCars() {
  const [myCars, setMyCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [message, setMessage] = useState("");

  // Editable fields
  const [editTitle, setEditTitle] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editFuelType, setEditFuelType] = useState("");
  const [editTransmission, setEditTransmission] = useState("");
  const [editOwnership, setEditOwnership] = useState("");
  const [editBrand, setEditBrand] = useState("");
  const [editSource, setEditSource] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editMileage, setEditMileage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setMessage("❌ Please log in to view your cars.");
      return;
    }

    fetch("http://localhost:4000/cars", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        const uid = JSON.parse(atob(token.split('.')[1])).user_id;
        const userCars = data.filter(car => car.createdBy === uid);
        setMyCars(userCars);
      })
      .catch(err => {
        console.error("❌ Error fetching cars:", err);
        setMessage("❌ Failed to fetch your cars.");
      });
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/cars/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setMyCars(myCars.filter(car => car._id !== id));
        setMessage("✅ Car deleted.");
      } else {
        const text = await res.text();
        setMessage(text || "❌ Failed to delete car.");
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
      setMessage("❌ Error deleting car.");
    }
  };

  const handleEditClick = (car) => {
    setEditingCar(car._id);
    setEditTitle(car.title || "");
    setEditLocation(car.location || "");
    setEditFuelType(car.fuelType || "");
    setEditTransmission(car.transmission || "");
    setEditOwnership(car.ownership || "");
    setEditBrand(car.brand || "");
    setEditSource(car.source || "");
    setEditPrice(car.price || "");
    setEditMileage(car.mileage || "");
  };

  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/cars/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: editTitle,
          location: editLocation,
          fuelType: editFuelType,
          transmission: editTransmission,
          ownership: editOwnership,
          brand: editBrand,
          source: editSource,
          price: Number(editPrice),
          mileage: Number(editMileage)
        })
      });

      if (res.ok) {
        setMyCars(myCars.map(car =>
          car._id === id
            ? { ...car, title: editTitle, location: editLocation, fuelType: editFuelType, transmission: editTransmission, ownership: editOwnership, brand: editBrand, source: editSource, price: editPrice, mileage: editMileage }
            : car
        ));
        setEditingCar(null);
        setMessage("✅ Car updated.");
      } else {
        const text = await res.text();
        setMessage(text || "❌ Failed to update car.");
      }
    } catch (err) {
      console.error("❌ Update error:", err);
      setMessage("❌ Error updating car.");
    }
  };

  return (
    <div className="mycars-page">
      <h1>My Listed Cars</h1>
      {message && <p className="status-message">{message}</p>}

      {myCars.length === 0 ? (
        <p>You have no listed cars.</p>
      ) : (
        <div className="mycars-container">
          {myCars.map(car => (
            <div key={car._id} className="mycar-card">
              <h3>{car.title}</h3>
              <p>Location: {car.location}</p>
              <p>Source: {car.source}</p>
              {editingCar === car._id ? (
                <>
                  <label>Title:</label>
                  <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} />

                  <label>Location:</label>
                  <input type="text" value={editLocation} onChange={e => setEditLocation(e.target.value)} />

                  <label>Fuel Type:</label>
                  <input type="text" value={editFuelType} onChange={e => setEditFuelType(e.target.value)} />

                  <label>Transmission:</label>
                  <input type="text" value={editTransmission} onChange={e => setEditTransmission(e.target.value)} />

                  <label>Ownership:</label>
                  <input type="text" value={editOwnership} onChange={e => setEditOwnership(e.target.value)} />

                  <label>Brand:</label>
                  <input type="text" value={editBrand} onChange={e => setEditBrand(e.target.value)} />

                  <label>Source:</label>
                  <input type="text" value={editSource} onChange={e => setEditSource(e.target.value)} />

                  <label>Price (₹):</label>
                  <input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} />

                  <label>Mileage (km):</label>
                  <input type="number" value={editMileage} onChange={e => setEditMileage(e.target.value)} />

                  <button onClick={() => handleUpdate(car._id)}>Save</button>
                  <button onClick={() => setEditingCar(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <p>💲 {car.price}</p>
                  <p>🚗 {car.mileage} km</p>
                  <p>⛽ {car.fuelType}</p>
                  <p>⚙️ {car.transmission}</p>
                  <p>👤 {car.ownership}</p>
                  <p>🏷️ {car.brand}</p>
                  <button onClick={() => handleEditClick(car)}>Edit</button>
                  <button onClick={() => handleDelete(car._id)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCars;
