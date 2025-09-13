export function simulateDriverMovement(startLocation, onUpdate) {
  let lat = startLocation.lat;
  let lng = startLocation.lng;
  let stopped = false;

  const id = setInterval(() => {
    // random walk with some bias
    lat += (Math.random() - 0.5) * 0.01;
    lng += (Math.random() - 0.5) * 0.01;
    onUpdate({ lat, lng });
  }, 1000);

  return () => {
    clearInterval(id);
    stopped = true;
  };
}
