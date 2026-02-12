import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="container mt-10">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="display-4 mb-4">Welcome to StayEase</h1>
          <p className="lead mb-4">
            Discover and book amazing vacation properties with ease. Whether you're looking for a cozy cabin in the mountains or a luxurious suite in the city, we have the perfect place for your getaway.
          </p>
          <div className="mb-4">
            <img
              src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
              alt="Vacation"
              className="img-fluid rounded"
              style={{ maxHeight: "400px" }}
            />
          </div>
          <div>
            <Link to="/login" className="btn btn-primary btn-lg me-3">
              Login to Book
            </Link>
            <Link to="/properties" className="btn btn-outline-primary btn-lg">
              View Properties
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
