// /components/EmployeeCard.js
import React from "react";
function EmployeeCard({ employee, onEdit, onDelete }) {
  const statusColor =
    employee.status === "Active" ? "bg-green-500" : "bg-red-500";

  return (
    <div className="border shadow rounded-xl p-4 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold">{employee.name}</h2>
          <p className="text-sm text-gray-700">{employee.email}</p>
          <p className="text-sm text-gray-500">{employee.role}</p>
          <p className="text-sm text-gray-400">{employee.department}</p>
          <span
            className={`inline-block mt-2 px-2 py-1 text-xs text-white rounded ${statusColor}`}
          >
            {employee.status}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            className="text-blue-600 hover:underline text-sm"
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            className="text-red-600 hover:underline text-sm"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;
