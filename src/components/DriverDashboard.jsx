import React, { useState } from "react";
import BookingForm from "./BookingForm";
import Tracker from "./Tracker";

export default function DriverDashboard() {
  const [selectedBooking, setSelectedBooking] = useState(null);

  return (
    <div className="driver-dashboard">
      <h2>Driver Dashboard</h2>
      <BookingForm onBook={setSelectedBooking} />
      {selectedBooking && <Tracker booking={selectedBooking} />}
    </div>
  );
}
