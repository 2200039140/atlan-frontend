// src/utils/estimator.js
export function estimatePrice({ distanceKm, vehicleBase, goods }) {
  const goodsFactors = {
    Electronics: 1.2,
    Furniture: 1.1,
    Groceries: 1.0,
    "Fragile Items": 1.3,
    "Heavy Machinery": 1.5,
  };

  const factor = goodsFactors[goods] || 1;
  return distanceKm * vehicleBase * factor;
}
