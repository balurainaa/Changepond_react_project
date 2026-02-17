import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

function PropertyList({ properties, isLoggedIn }) {
  return (
    <div className="mb-5">
      <Carousel className="mb-4">
        {properties.map((property) => (
          <Carousel.Item key={property.id}>
            <img
              className="d-block w-100"
              src={property.image}
              alt={property.name}
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3>{property.name}</h3>
              <p>{property.type} - ₹{property.price} / Night</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <h2 className="mb-4 text-center">Explore Our Stays</h2>
      <div className="row">
        {properties.map((property) => (
          <div className="col-md-4" key={property.id}>
            <div className="card shadow-sm mb-4">
              <img
                src={property.image}
                alt={property.name}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{property.name}</h5>
                <p className="card-text">
                  Type: {property.type} <br />
                  Capacity: {property.capacity} Guests <br />
                  Price: ₹{property.price} / Night
                </p>
                <Link to={isLoggedIn ? "/book" : "/login"} className="btn btn-primary">
                  {isLoggedIn ? "Book Now" : "Login to Book"}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyList;