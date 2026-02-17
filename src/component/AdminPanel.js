import React, { useState } from "react";
import AdminPropertyManager from "./AdminPropertyManager";

function AdminPanel({ bookings, properties, users, cancelBooking, addProperty, updateProperty, deleteProperty, deleteUser }) {
  const [showPast, setShowPast] = useState(false);

  const today = new Date();
  today.setHours(0,0,0,0);

  const displayedBookings = bookings.filter((booking) => {
    if (showPast) return true;
    try {
      const end = new Date(booking.endDate);
      end.setHours(0,0,0,0);
      return end >= today;
    } catch (e) {
      return true;
    }
  });

  return (
    <div className="mb-5">
      <h2 className="mb-4">Admin Panel</h2>

      <AdminPropertyManager 
        properties={properties}
        addProperty={addProperty}
        updateProperty={updateProperty}
        deleteProperty={deleteProperty}
      />

      <h3>All Bookings</h3>
      <div className="mb-3 d-flex align-items-center">
        <label className="me-2">Show past bookings</label>
        <input type="checkbox" checked={showPast} onChange={(e) => setShowPast(e.target.checked)} />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Property</th>
            <th>Name</th>
            <th>Date Range</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedBookings.map((booking) => {
            const property = properties.find(p => String(p.id) === String(booking.propertyId));
            return (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{property ? property.name : "Unknown"}</td>
                <td>{booking.name}</td>
                <td>{booking.startDate} to {booking.endDate}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => cancelBooking(booking.id)}>Cancel</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h3>Registered Users</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id || index}>
              <td>{user.name || '-'}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    if (window.confirm('Delete this user? This will remove them from data.json.')) {
                      // prefer id when available, fallback to index
                      deleteUser(user.id || index);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
