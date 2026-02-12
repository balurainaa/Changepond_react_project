import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data.json";

function Login({ setIsLoggedIn, setIsAdmin }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get users from localStorage, fallback to data.json
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const allUsers = [...data.users, ...storedUsers];

    // Validate credentials against users array
    const user = allUsers.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      setIsLoggedIn(true);
      setIsAdmin(user.isAdmin);
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <div className="mt-3 text-center">
            <small className="text-muted">
              Don't have an account? <a href="/register">Register here</a>
            </small>
            <br />
            <small className="text-muted">Admin login: admin@example.com / admin</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
