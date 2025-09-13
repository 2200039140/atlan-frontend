import React, { useState, useContext } from "react";
import { BookingContext } from "../contexts/BookingContext";
import { vehicleTypes } from "../utils/vehicles";

export default function BookingForm({ onBook }) {
  const { addBooking } = useContext(BookingContext);

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [goods, setGoods] = useState("");
  const [distance, setDistance] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleTypes[0].id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const vehicle = vehicleTypes.find((v) => v.id === selectedVehicle);

    if (!vehicle) {
      alert("Invalid vehicle selection!");
      return;
    }

    const booking = {
      pickup,
      dropoff,
      goods,
      distance,
      vehicle: vehicle.label,
      status: "Booked",
    };

    addBooking(booking);
    onBook(booking);

    // reset form
    setPickup("");
    setDropoff("");
    setGoods("");
    setDistance("");
    setSelectedVehicle(vehicleTypes[0].id);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Book a Vehicle</h2>

      <label>Pickup location</label>
      <input value={pickup} onChange={(e) => setPickup(e.target.value)} required />

      <label>Drop-off location</label>
      <input value={dropoff} onChange={(e) => setDropoff(e.target.value)} required />

      <label>Estimated distance (km)</label>
      <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} required />

      <label>Vehicle type</label>
      <select value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)}>
        {vehicleTypes.map((v) => (
          <option key={v.id} value={v.id}>
            {v.label}
          </option>
        ))}
      </select>

      <label>Goods type</label>
      <input value={goods} onChange={(e) => setGoods(e.target.value)} required />

      <button type="submit">Book Now</button>
    </form>
  );
}
