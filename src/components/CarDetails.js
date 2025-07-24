import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./CarDetails.css";

function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4000/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data.car || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching car details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!car) return (
    <div>
      Car not found.
      <br />
      <Link to="/">Back to Home</Link>
    </div>
  );

  return (
    <div className="car-details">
      <h1>{car.name} ({car.year})</h1>
      <p>📍 Location: {car.location}</p>
      <p>💰 Price: ₹ {car.price?.toLocaleString()}</p>
      <p>🚗 KMs Driven: {car.kms_driven?.toLocaleString()} km</p>
      <p>⛽ Fuel Type: {car.fuel_type}</p>
      <p>🔁 Transmission: {car.transmission}</p>
      <p>👤 Owner: {car.owner}</p>
      <p>🛒 Seller Type: {car.seller_type}</p>
      <p>🌐 Source: {car.source}</p>
      <br />
      <button className="buy-button" onClick={() => alert('Thank you for your interest! We will contact you soon.')}>
  Buy Now
</button>
 <br /> <br />
      <Link to="/">← Back to Home</Link>
    </div>
  );
}

export default CarDetails;
