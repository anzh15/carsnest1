// /components/EmployeeForm.js
import React, { useState } from "react";

function EmployeeForm({ employee, onClose, onSave }) {
  const [form, setForm] = useState(
    employee || {
      name: "",
      email: "",
      role: "",
      department: "",
      status: "Active",
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = employee ? "PUT" : "POST";
    const url = employee
      ? `http://localhost:4000/employees/${employee._id}`
      : "http://localhost:4000/employees";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-lg font-semibold">
          {employee ? "Edit Employee" : "Add Employee"}
        </h2>
        <input
          required
          type="text"
          placeholder="Name"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          required
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          required
          type="text"
          placeholder="Role"
          className="w-full border p-2 rounded"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        <select
          required
          className="w-full border p-2 rounded"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        >
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Operations">Operations</option>
          <option value="Marketing">Marketing</option>
          <option value="Admin">Admin</option>
          <option value="Design">Design</option>
        </select>
        <select
          className="w-full border p-2 rounded"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div className="flex justify-between">
          <button
            type="button"
            className="text-red-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {employee ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;
