import React from "react";

function BookingList({ bookings, cancelBooking, properties }) {
  const handleCancel = (id) => {
    const booking = bookings.find(b => b.id === id);
    const property = properties.find(p => p.id === booking.propertyId);

    const confirmCancel = window.confirm(
      `Are you sure you want to cancel this booking?\n\nProperty: ${property.name}\nCity: ${property.city}\nDate: ${booking.date}\nCheck-in: ${booking.start}\nCheck-out: ${booking.end}\n\nThis action cannot be undone.`
    );

    if (confirmCancel) {
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
            const property = properties.find((p) => p.id === booking.propertyId);
            return (
              <div key={booking.id} className="col-md-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{property ? property.name : "Unknown Property"}</h5>
                    <p className="card-text">
                      <strong>City:</strong> {property ? property.city : "Unknown"}<br />
                      <strong>Dates:</strong> {booking.startDate} to {booking.endDate}<br />
                      <strong>Booked by:</strong> {booking.name}<br />
                      <strong>Price:</strong> ${property ? property.price : "N/A"}
                    </p>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCancel(booking.id)}
                    >
                      Cancel Booking
                    </button>
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
