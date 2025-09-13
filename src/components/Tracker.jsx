// src/components/Tracker.jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom truck icon
const truckIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1995/1995525.png",
  iconSize: [40, 40],
});

export default function Tracker({ booking }) {
  const [driverPos, setDriverPos] = useState([12.9716, 77.5946]); // default: Bangalore

  // simulate driver movement
  useEffect(() => {
    if (!booking) return;
    const interval = setInterval(() => {
      setDriverPos((prev) => [
        prev[0] + (Math.random() - 0.5) * 0.01, // small latitude change
        prev[1] + (Math.random() - 0.5) * 0.01, // small longitude change
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, [booking]);

  return (
    <div className="card tracker-card">
      <h3>Real-time Tracking</h3>
      {!booking && <div className="muted">Create a booking to start tracking</div>}

      {booking && (
        <>
          <MapContainer center={driverPos} zoom={13} style={{ height: "300px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={driverPos} icon={truckIcon}>
              <Popup>
                Driver en route<br />
                {driverPos[0].toFixed(4)}, {driverPos[1].toFixed(4)}
              </Popup>
            </Marker>
          </MapContainer>

          <div className="tracker-info">
            <div><strong>Pickup:</strong> {booking.pickup}</div>
            <div><strong>Drop:</strong> {booking.dropoff}</div>
            <div><strong>Status:</strong> {booking.status}</div>
            <div><strong>Driver:</strong> {driverPos[0].toFixed(4)}, {driverPos[1].toFixed(4)}</div>
          </div>
        </>
      )}
    </div>
  );
}

Tracker.propTypes = {
  booking: PropTypes.object,
};
