// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";  // ✅ correct import for React 18
import App from "./App";
import "./styles.css";

const container = document.getElementById("root");
const root = createRoot(container);  
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
