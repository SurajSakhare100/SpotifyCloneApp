import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SpotifyLogin from "./pages/SpotifyLogin.jsx";
import Callback from "./pages/Callback.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<SpotifyLogin />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/" element={<App />} /> {/* Catch-all route */}
      </Routes>
    </Router>
  </React.StrictMode>
);
