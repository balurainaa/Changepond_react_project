import React from "react";
import AdminPropertyManager from "./AdminPropertyManager";

function AdminPanel({ bookings, properties, users, cancelBooking, addProperty, updateProperty, deleteProperty }) {
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
          {bookings.map((booking) => {
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
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
