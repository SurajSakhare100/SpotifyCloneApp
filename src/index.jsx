import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Callback from "./pages/Callback.jsx";
import Display from "./components/Display"; // Import Display component
import Error from "./pages/Error.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="*" element={<Error/>}/>
        <Route path="/callback" element={<Callback />} />
        <Route path="/" element={<App />}>
          <Route path="" element={<Display />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
