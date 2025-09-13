// Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Signup() {
     const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup data:", form);
    // TODO: call backend API to save user
     localStorage.setItem("user", JSON.stringify(form));
    alert("Signup successful! Please login.");
    navigate("/login"); // redirect to login after signup
  };

   

  return (
    <div className="auth-container">
      <h2>🚀 Signup</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="text" name="username" placeholder="Full Name" value={form.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="driver">Driver</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Signup</button>
        <p>
        Already have an account?{" "}
        <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/login")}>
          Login here
        </span>
      </p>
      </form>
    </div>
  );
}
