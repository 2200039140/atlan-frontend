import React from 'react';

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="brand">TransportService</div>
      <ul className="nav-links">
        <li>Booking</li>
        <li>Tracking</li>
        <li>Estimator</li>
      </ul>
    </nav>
  );
}