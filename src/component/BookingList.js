import React from "react";

function BookingList({ bookings, cancelBooking, properties }) {
  const handleCancel = (id) => {
    const booking = bookings.find(b => b.id === id);
    const property = properties.find(p => String(p.id) === String(booking.propertyId));

    if (!property) {
      alert("Property not found.");
      return;
    }

    const confirmCancel = window.confirm(
      `Are you sure you want to cancel this booking?\n\nProperty: ${property.name}\nState: ${property.state}\nDate: ${booking.date}\nCheck-in: ${booking.start}\nCheck-out: ${booking.end}\n\nThis action cannot be undone.`
    );

    if (confirmCancel) {
      if (booking.cancelled) {
        alert('This booking is already cancelled.');
        return;
      }
      cancelBooking(id);
      alert("Booking cancelled successfully.");
    }
  };

  return (
    <div className="mb-5">
      <h3>Your Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="row">
          {bookings.map((booking) => {
            const property = properties.find((p) => String(p.id) === String(booking.propertyId));
            return (
              <div key={booking.id} className="col-md-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{property ? property.name : "Unknown Property"}</h5>
                    <p className="card-text">
                      <strong>State:</strong> {property ? property.state : "Unknown"}<br />
                      <strong>Dates:</strong> {booking.startDate} to {booking.endDate}<br />
                      <strong>Booked by:</strong> {booking.name}<br />
                      <strong>Price:</strong> ₹{property ? property.price : "N/A"}
                    </p>
                    {booking.cancelled ? (
                      <button className="btn btn-secondary" disabled>Cancelled</button>
                    ) : (
                      <button className="btn btn-danger" onClick={() => handleCancel(booking.id)}>Cancel Booking</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BookingList;
