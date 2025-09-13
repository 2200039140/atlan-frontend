import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from 'react';
import BookingForm from './components/BookingForm';
import Signup from "./components/Signup";
import Login from "./components/Login";
import PriceEstimator from './components/PriceEstimator';
import Tracker from './components/Tracker';
import Navbar from './components/Navbar';
import DriverDashboard from "./components/DriverDashboard";
import { BookingProvider } from './contexts/BookingContext';

export default function App() {
  const [selectedBooking, setSelectedBooking] = useState(null);
   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
       <BookingProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Signup />} />
           <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
           


<Route path="/BookingForm" element={<BookingForm onBook={setSelectedBooking} />} />
       <Route path="/driver" element={<DriverDashboard />} />
         { /*<Route path="/admin" element={<AdminDashboard />} />*/}
          {/* Protected route for logged-in users */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
      <div className="app-root">
        <Navbar />
        <main className="container">
          <section className="left-panel">
            <BookingForm onBook={setSelectedBooking} />
            <PriceEstimator />
          </section>
          <section className="right-panel">
            <Tracker booking={selectedBooking} />
          </section>
        </main>
        <footer className="footer">© {new Date().getFullYear()} TransportService</footer>
      </div>
    ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BookingProvider>
    </Router>
  );
}
