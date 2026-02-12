import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import data from "./data.json";
import Navbar from "./component/Navbar";
import PropertyList from "./component/PropertyList";
import BookingForm from "./component/BookingForm";
import BookingList from "./component/BookingList";
import Login from "./component/Login";
import Register from "./component/Register";
import AdminPanel from "./component/AdminPanel";
import LandingPage from "./component/LandingPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const properties = data.properties;

  const [bookings, setBookings] = useState(data.bookings);

  // Load saved bookings
  useEffect(() => {
    const saved = localStorage.getItem("bookings");
    if (saved) {
      setBookings(JSON.parse(saved));
    }
  }, []);

  // Load user session from localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setIsAdmin(parsedUser.isAdmin);
    }
  }, []);

  // Save bookings
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (newBooking) => {
    const overlap = bookings.some(
      (existing) =>
        existing.propertyId === newBooking.propertyId &&
        newBooking.startDate < existing.endDate &&
        newBooking.endDate > existing.startDate
    );

    if (overlap) {
      alert("This room is already booked for the selected dates. Please try different dates or choose another room.");
      return;
    }

    setBookings([...bookings, { ...newBooking, id: Date.now() }]);
  };

  const cancelBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={isLoggedIn ? <PropertyList properties={properties} isLoggedIn={isLoggedIn} /> : <LandingPage />} />
          <Route path="/properties" element={<PropertyList properties={properties} isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book" element={isLoggedIn ? <BookingForm properties={properties} addBooking={addBooking} /> : <Navigate to="/login" />} />
          <Route path="/bookings" element={isLoggedIn ? <BookingList bookings={bookings} cancelBooking={cancelBooking} properties={properties} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isLoggedIn && isAdmin ? <AdminPanel bookings={bookings} properties={properties} cancelBooking={cancelBooking} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;