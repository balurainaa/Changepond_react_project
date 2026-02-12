import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }) {
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem("user");
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          StayEase – Vacation Booking
        </Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Home</Link>
          {isLoggedIn ? (
            <>
              {!isAdmin && <Link className="nav-link" to="/book">Book Now</Link>}
              {!isAdmin && <Link className="nav-link" to="/bookings">My Bookings</Link>}
              {isAdmin && <Link className="nav-link" to="/admin">Admin Panel</Link>}
              <button className="btn btn-outline-light ms-2" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              {/* <Link className="nav-link" to="/login">Login</Link> */}
              <Link className="nav-link" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
