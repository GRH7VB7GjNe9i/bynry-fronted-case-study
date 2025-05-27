import React, { useState } from "react";
import { profiles as initialProfiles } from "../data/profiles";

export default function AdminDashBoard() {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [formData, setFormData] = useState({ name: "", email: "", status: "Active" });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...profiles];
      updated[editIndex] = { ...updated[editIndex], ...formData };
      setProfiles(updated);
      setEditIndex(null);
    } else {
      const newProfile = {
        id: Date.now().toString(),
        ...formData,
        created: new Date().toLocaleString(),
      };
      setProfiles((prev) => [...prev, newProfile]);
    }
    setFormData({ name: "", email: "", status: "Active" });
  };

  const handleEdit = (index) => {
    const { name, email, status } = profiles[index];
    setFormData({ name, email, status });
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure to delete?")) {
      const updated = profiles.filter((_, i) => i !== index);
      setProfiles(updated);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">User Management Dashboard</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="p-2 border rounded"
          required
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-2 border rounded"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto"
        >
          {editIndex !== null ? "Update" : "Add"} User
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">SL</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Created</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((user, index) => (
              <tr key={user.id} className="text-center">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      user.status === "Active" ? "bg-green-500" : "bg-gray-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-2 px-4 border">{user.created || "—"}</td>
                <td className="py-2 px-4 border space-x-2">
                  <button className="bg-green-500 px-3 py-1 text-white rounded text-sm">
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 px-3 py-1 text-white rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 px-3 py-1 text-white rounded text-sm"
                  >
                    Remove
                  </button>
                  <button className="bg-yellow-600 px-3 py-1 text-white rounded text-sm">
                    Disable
                  </button>
                </td>
              </tr>
            ))}
            {profiles.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No users available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
