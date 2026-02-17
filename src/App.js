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

  
  useEffect(() => {
    const saved = localStorage.getItem("bookings");
    if (saved) {
      setBookings(JSON.parse(saved));
    }
  }, []);

  
  useEffect(() => {
    const saved = localStorage.getItem("properties");
    if (saved) {
      setProperties(JSON.parse(saved));
    }
  }, []);

  
  useEffect(() => {
    const saved = localStorage.getItem("users");
    if (saved) {
      setUsers(JSON.parse(saved));
    }
  }, []);

  
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setIsLoggedIn(true);
      setIsAdmin(parsedUser.isAdmin);
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  
  useEffect(() => {
    localStorage.setItem("properties", JSON.stringify(properties));
  }, [properties]);

  
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addBooking = (newBooking) => {
    // ensure dates are valid and start is not in the past
    try {
      const today = new Date();
      today.setHours(0,0,0,0);
      const s = new Date(newBooking.startDate);
      const e = new Date(newBooking.endDate);
      s.setHours(0,0,0,0);
      e.setHours(0,0,0,0);

      if (s < today) {
        alert('Start date cannot be in the past.');
        return;
      }

      if (s > e) {
        alert('End date must be after or equal to start date.');
        return;
      }

      const overlap = bookings.some((existing) => {
        const es = new Date(existing.startDate);
        const ee = new Date(existing.endDate);
        es.setHours(0,0,0,0);
        ee.setHours(0,0,0,0);
        return (
          existing.propertyId === newBooking.propertyId &&
          s <= ee &&
          e >= es
        );
      });

      if (overlap) {
        alert("This room is already booked for the selected dates. Please try different dates or choose another room.");
        return;
      }

      setBookings([...bookings, { ...newBooking, id: Date.now() }]);
    } catch (err) {
      alert('Invalid dates provided.');
      return;
    }
  };

  const cancelBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  const addProperty = (newProperty) => {
    const maxId = Math.max(0, ...properties.map(p => Number(p.id) || 0));
    const id = String(maxId + 1);
    const updated = [...properties, { ...newProperty, id }];
    setProperties(updated);
    persistDataToServer({ properties: updated });
  };

  const updateProperty = (id, updatedProperty) => {
    const updated = properties.map((property) =>
      String(property.id) === String(id) ? { ...property, ...updatedProperty } : property
    );
    setProperties(updated);
    persistDataToServer({ properties: updated });
  };

  const deleteProperty = (id) => {
    const updated = properties.filter((property) => String(property.id) !== String(id));
    setProperties(updated);
    persistDataToServer({ properties: updated });
  };

  const persistDataToServer = async (payload) => {
    try {
      await fetch('http://localhost:8000/api/save-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.warn('Could not persist to server:', e.message);
    }
  };

  const deleteUser = (identifier) => {
    // identifier can be an id or index fallback
    let updated = [];
    if (typeof identifier === 'number') {
      // treat as index
      updated = users.filter((_, i) => i !== identifier);
    } else {
      // treat as id or email
      updated = users.filter((u) => u.id !== identifier && u.email !== identifier);
    }
    setUsers(updated);
    persistDataToServer({ users: updated });
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
          <Route path="/admin" element={isLoggedIn && isAdmin ? <AdminPanel bookings={bookings} properties={properties} users={users} cancelBooking={cancelBooking} addProperty={addProperty} updateProperty={updateProperty} deleteProperty={deleteProperty} deleteUser={deleteUser} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;