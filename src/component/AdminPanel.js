import React, { useState } from "react";
import AdminPropertyManager from "./AdminPropertyManager";

function AdminPanel({ bookings, properties, users, cancelBooking, addProperty, updateProperty, deleteProperty, deleteUser }) {
  const [bookingView, setBookingView] = useState('upcoming');

  const today = new Date();
  today.setHours(0,0,0,0);

  const displayedBookings = bookings.filter((booking) => {
    // bookingView options:
    // 'upcoming' -> show bookings with endDate >= today and not cancelled
    // 'all' -> show all bookings
    // 'past_cancelled' -> show past bookings (endDate < today) and include cancelled bookings
    try {
      const end = new Date(booking.endDate);
      end.setHours(0, 0, 0, 0);

      if (bookingView === 'all') return true;

      if (bookingView === 'upcoming') {
        if (booking.cancelled) return false;
        return end >= today;
      }

      if (bookingView === 'past_cancelled') {
        return booking.cancelled || end < today;
      }

      return true;
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
        <label className="me-2">Booking view</label>
        <select className="form-select w-auto" value={bookingView} onChange={(e) => setBookingView(e.target.value)}>
          <option value="upcoming">Upcoming only</option>
          <option value="all">All bookings</option>
          <option value="past_cancelled">Past (include cancelled)</option>
        </select>
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
                  {booking.cancelled ? (
                    <span className="text-muted">Cancelled</span>
                  ) : (
                    <button className="btn btn-danger btn-sm" onClick={() => cancelBooking(booking.id)}>Cancel</button>
                  )}
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
