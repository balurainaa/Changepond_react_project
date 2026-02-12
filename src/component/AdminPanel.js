import React from "react";

function AdminPanel({ bookings, properties, cancelBooking }) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  return (
    <div className="mb-5">
      <h2 className="mb-4">Admin Panel</h2>

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
            const property = properties.find(p => p.id === booking.propertyId);
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

      <h3>All Properties</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td>{property.id}</td>
              <td>{property.name}</td>
              <td>{property.type}</td>
              <td>${property.price}</td>
              <td>{property.capacity}</td>
            </tr>
          ))}
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
