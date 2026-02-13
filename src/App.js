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

  const [properties, setProperties] = useState(data.properties);

  const [bookings, setBookings] = useState(data.bookings);

  const [users, setUsers] = useState(data.users);

  // Load saved bookings
  useEffect(() => {
    const saved = localStorage.getItem("bookings");
    if (saved) {
      setBookings(JSON.parse(saved));
    }
  }, []);

  // Load saved properties
  useEffect(() => {
    const saved = localStorage.getItem("properties");
    if (saved) {
      setProperties(JSON.parse(saved));
    }
  }, []);

  // Load saved users
  useEffect(() => {
    const saved = localStorage.getItem("users");
    if (saved) {
      setUsers(JSON.parse(saved));
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

  // Save properties
  useEffect(() => {
    localStorage.setItem("properties", JSON.stringify(properties));
  }, [properties]);

  // Save users
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

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

  const addProperty = (newProperty) => {
    const id = Math.max(...properties.map(p => p.id), 0) + 1;
    setProperties([...properties, { ...newProperty, id }]);
  };

  const updateProperty = (id, updatedProperty) => {
    setProperties(
      properties.map((property) =>
        property.id === id ? { ...property, ...updatedProperty } : property
      )
    );
  };

  const deleteProperty = (id) => {
    setProperties(properties.filter((property) => property.id !== id));
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
          <Route path="/admin" element={isLoggedIn && isAdmin ? <AdminPanel bookings={bookings} properties={properties} users={users} cancelBooking={cancelBooking} addProperty={addProperty} updateProperty={updateProperty} deleteProperty={deleteProperty} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;