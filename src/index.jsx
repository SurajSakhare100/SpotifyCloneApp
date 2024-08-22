import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SpotifyLogin from "./pages/SpotifyLogin.jsx";
import Callback from "./pages/Callback.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/login" element={<SpotifyLogin />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
);
