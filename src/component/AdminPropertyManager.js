import React, { useState } from "react";
import "./AdminPropertyManager.css";

function AdminPropertyManager({ properties, addProperty, updateProperty, deleteProperty }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    capacity: "",
    state: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.type || !formData.price || !formData.capacity || !formData.state || !formData.image) {
      alert("Please fill in all fields");
      return;
    }

    if (editingId) {
      updateProperty(editingId, {
        ...formData,
        price: parseFloat(formData.price),
        capacity: parseInt(formData.capacity),
      });
      alert("Property updated successfully!");
    } else {
      addProperty({
        ...formData,
        price: parseFloat(formData.price),
        capacity: parseInt(formData.capacity),
      });
      alert("Property added successfully!");
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      price: "",
      capacity: "",
      state: "",
      image: "",
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (property) => {
    setFormData({
      name: property.name,
      type: property.type,
      price: property.price.toString(),
      capacity: property.capacity.toString(),
      state: property.state,
      image: property.image,
    });
    setEditingId(property.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      deleteProperty(id);
      alert("Property deleted successfully!");
    }
  };

  return (
    <div className="admin-property-manager">
      <h2 className="mb-4">Manage Properties</h2>

      {!showForm && (
        <button className="btn btn-success mb-4" onClick={() => setShowForm(true)}>
          + Add New Property
        </button>
      )}

      {showForm && (
        <div className="form-container mb-5">
          <h3>{editingId ? "Edit Property" : "Add New Property"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Property Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Ocean View Villa"
              />
            </div>

            <div className="form-group">
              <label>Type</label>
              <select
                name="type"
                className="form-control"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="">Select Type</option>
                <option value="Villa">Villa</option>
                <option value="Vacation Home">Vacation Home</option>
                <option value="Hotel Room">Hotel Room</option>
                <option value="Apartment">Apartment</option>
                <option value="Cottage">Cottage</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price (Per Night)</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g., 250"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label>Capacity (Guests)</label>
              <input
                type="number"
                name="capacity"
                className="form-control"
                value={formData.capacity}
                onChange={handleInputChange}
                placeholder="e.g., 4"
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                className="form-control"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="e.g., Maharashtra"
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                name="image"
                className="form-control"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? "Update Property" : "Add Property"}
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <h3>Properties List</h3>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Capacity</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td>{property.id}</td>
                <td>{property.name}</td>
                <td>{property.type}</td>
                <td>₹{property.price}</td>
                <td>{property.capacity} Guests</td>
                <td>{property.state}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(property)}
                    title="Edit"
                  >
                    ✎ Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(property.id)}
                    title="Delete"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {properties.length === 0 && (
        <p className="text-center text-muted mt-4">No properties found. Add one to get started!</p>
      )}
    </div>
  );
}

export default AdminPropertyManager;
