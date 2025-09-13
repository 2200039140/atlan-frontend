import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/bookings";

export const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  // Fetch all bookings from backend
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, []);

  // Add a booking (POST to backend)
  const addBooking = async (booking) => {
    try {
      const res = await axios.post(API_URL, booking);
      setBookings((prev) => [res.data, ...prev]); // add new booking to state
    } catch (err) {
      console.error("Error adding booking:", err);
    }
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
}
