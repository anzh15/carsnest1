import React, { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

const CarForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    price: "",
    kms_driven: "",
    fuel_type: "",
    seller_type: "",
    transmission: "",
    owner: "",
    location: "",
    source: "CarDekho",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        setMessage("Please login first.");
        return;
      }

      const token = await user.getIdToken();

      const res = await axios.post(
        "http://localhost:4000/cars",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        setMessage("✅ Car listed successfully!");
        setFormData({
          name: "",
          year: "",
          price: "",
          kms_driven: "",
          fuel_type: "",
          seller_type: "",
          transmission: "",
          owner: "",
          location: "",
          source: "CarDekho",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error submitting car.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">List Your Car</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {[
          ["name", "Car Name"],
          ["year", "Year"],
          ["price", "Price (₹)"],
          ["kms_driven", "Kilometers Driven"],
          ["fuel_type", "Fuel Type"],
          ["seller_type", "Seller Type"],
          ["transmission", "Transmission"],
          ["owner", "Owner"],
          ["location", "Location"],
        ].map(([key, label]) => (
          <input
            key={key}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={label}
            required
            className="p-2 border rounded"
          />
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>

        {message && <p className="text-sm text-gray-700">{message}</p>}
      </form>
    </div>
  );
};

export default CarForm;
