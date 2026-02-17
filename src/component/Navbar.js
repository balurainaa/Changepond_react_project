import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }) {
  const handleLogout = () => {
    const ok = window.confirm('Are you sure you want to log out?');
    if (!ok) return;
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem("user");
  };

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            <Link className="navbar-brand" to="/">StayEase – Room Booking</Link>
            {isLoggedIn && user && (
              <div className="navbar-text text-light" style={{ fontSize: '0.9rem' }}>Welcome, {user.name || user.email}</div>
            )}
          </div>
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
      </div>
    </nav>
  );
}

export default Navbar;
