import React, { useState } from "react";

function BookingForm({ properties, addBooking }) {
  const [formData, setFormData] = useState({
    propertyId: "",
    name: "",
    startDate: "",
    endDate: "",
  });

  const [filters, setFilters] = useState({
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredProperties = properties.filter((property) => {
    const matchesCity = !filters.city || property.city === filters.city;
    const matchesMinPrice = !filters.minPrice || property.price >= Number(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || property.price <= Number(filters.maxPrice);
    return matchesCity && matchesMinPrice && matchesMaxPrice;
  });

  const cities = [...new Set(properties.map(p => p.city))];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    const selectedProperty = filteredProperties.find(p => p.id === Number(formData.propertyId));

    const confirmBooking = window.confirm(
      `Confirm your booking:\n\nProperty: ${selectedProperty.name}\nCity: ${selectedProperty.city}\nDates: ${formData.startDate} to ${formData.endDate}\nPrice: $${selectedProperty.price}\n\nClick OK to confirm or Cancel to review.`
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
            <label className="form-label">City</label>
            <select
              className="form-select"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
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
                    {property.city} - ${property.price} per night
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
              <option key={property.id} value={property.id}>
                {property.name} - {property.city} (${property.price})
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
            onChange={handleChange}
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
