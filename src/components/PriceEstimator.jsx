import React, { useState } from 'react';
import { estimatePrice } from '../utils/estimator';

export default function PriceEstimator() {
  const [distance, setDistance] = useState('');
  const [vehicle, setVehicle] = useState('mini');
  const [goods, setGoods] = useState("Electronics");
  const [result, setResult] = useState(null);

  const vehicleBase = { mini: 50, medium: 80, large: 120 };

  const handleEstimate = (e) => {
    e.preventDefault();
    if (!distance) return;
    const est = estimatePrice({ distanceKm: Number(distance), vehicleBase: vehicleBase[vehicle],goods: goods});
    setResult(est);
  };

  return (
    <div className="card">
      <h3>Price Estimator</h3>
      <form onSubmit={handleEstimate} className="form-inline">
        <input placeholder="Distance km" value={distance} onChange={e => setDistance(e.target.value)} />
        <select value={vehicle} onChange={e => setVehicle(e.target.value)}>
          <option value="mini">Mini Truck</option>
          <option value="medium">Medium Truck</option>
          <option value="large">Large Truck</option>
        </select>
        
        <select value={goods} onChange={(e) => setGoods(e.target.value)}>
        <option>Electronics</option>
        <option>Furniture</option>
        <option>Groceries</option>
        <option>Fragile Items</option>
        <option>Heavy Machinery</option>
      </select>
        <button className="btn">Estimate</button>
      </form>
      {result !== null && <div className="estimate">Estimated cost: <strong>₹{result.toFixed(2)}</strong></div>}
    </div>
  );
}