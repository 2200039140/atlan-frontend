// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Auth.css";

export default function Login() {
     const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("user")); // demo
    if (savedUser && savedUser.email === form.email && savedUser.password === form.password) {
      alert("Login successful!");

      // 🔑 Role-based navigation
      if (savedUser.role === "Driver") {
        navigate("/driver");
      } else if (savedUser.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/BookingForm");
      }
    } else {
      alert("Invalid credentials!");
    }
  
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error logging in");
    }
  };

  return (
    <div className="auth-container">
      <h2>🔐 Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
