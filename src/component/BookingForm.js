import React, { useState } from "react";

function BookingForm({ properties, addBooking }) {
  const [formData, setFormData] = useState({
    propertyId: "",
    name: "",
    startDate: "",
    endDate: "",
  });

  const [filters, setFilters] = useState({
    state: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredProperties = properties.filter((property) => {
    const matchesState = !filters.state || property.state === filters.state;
    const matchesMinPrice = !filters.minPrice || property.price >= Number(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || property.price <= Number(filters.maxPrice);
    return matchesState && matchesMinPrice && matchesMaxPrice;
  });

  const states = [...new Set(properties.map((p) => p.state))];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // helper to return yyyy-mm-dd for today
  const todayIso = () => {
    const d = new Date();
    d.setHours(0,0,0,0);
    return d.toISOString().split('T')[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.propertyId ||
      !formData.name ||
      !formData.startDate ||
      !formData.endDate
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (formData.startDate > formData.endDate) {
      alert("End date must be after or equal to start date.");
      return;
    }

    const selectedProperty = filteredProperties.find(p => String(p.id) === String(formData.propertyId));

    if (!selectedProperty) {
      alert("Please select a valid property.");
      return;
    }

    const confirmBooking = window.confirm(
      `Confirm your booking:\n\nProperty: ${selectedProperty.name}\nState: ${selectedProperty.state}\nDates: ${formData.startDate} to ${formData.endDate}\nPrice: ₹${selectedProperty.price}\n\nClick OK to confirm or Cancel to review.`
    );

    if (!confirmBooking) {
      return;
    }

    addBooking({
      propertyId: Number(formData.propertyId),
      name: formData.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
    });

    alert("Booking confirmed successfully!");

    setFormData({
      propertyId: "",
      name: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="mb-5">
      <h3>Book Your Stay</h3>

      <div className="mb-4">
        <h4>Filter Properties</h4>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">State</label>
            <select
              className="form-select"
              name="state"
              value={filters.state}
              onChange={handleFilterChange}
            >
              <option value="">All States</option>
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Min Price</label>
            <input
              type="number"
              className="form-control"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="e.g., 100"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Max Price</label>
            <input
              type="number"
              className="form-control"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="e.g., 300"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h4>Available Properties ({filteredProperties.length})</h4>
        <div className="row">
          {filteredProperties.map((property) => (
            <div key={property.id} className="col-md-4 mb-3">
              <div className="card">
                <img
                  src={property.image}
                  className="card-img-top"
                  alt={property.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{property.name}</h5>
                  <p className="card-text">
                    {property.state} - ₹{property.price} per night
                  </p>
                  <p className="card-text">
                    Type: {property.type}, Capacity: {property.capacity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h4>Booking Details</h4>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-4">
          <select
            className="form-select"
            name="propertyId"
            value={formData.propertyId}
            onChange={handleChange}
          >
            <option value="">Select Property</option>
            {filteredProperties.map((property) => (
              <option key={property.id} value={String(property.id)}>
                {property.name} - {property.state} (₹{property.price})
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            value={formData.startDate}
            onChange={(e) => {
              // if endDate is before new startDate, clear endDate to avoid invalid range
              const newStart = e.target.value;
              if (formData.endDate && newStart && formData.endDate < newStart) {
                setFormData({ ...formData, startDate: newStart, endDate: '' });
              } else {
                setFormData({ ...formData, startDate: newStart });
              }
            }}
            min={todayIso()}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            min={formData.startDate || todayIso()}
          />
        </div>

        <div className="col-md-4">
          <button type="submit" className="btn btn-primary w-100">
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;
