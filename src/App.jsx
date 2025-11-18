import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Home from "./pages/home";
import Hero from "./components/hero";   // <-- ADD THIS

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />

      {/* NEW ROUTE FOR HERO */}
      <Route path="/hero" element={<Hero />} />
    </Routes>
  );
}


