// src/App.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Home from "./pages/home";
import Hero from "./components/hero";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import MyQueue from "./pages/MyQueue";
import CreateDCL from "./pages/CreateDCL";
import Deferrals from "./pages/Deferrals";
import Completed from "./pages/Completed";
import Active from "./pages/Active";
import Reports from "./pages/Reports";
import CreatorReview from "./pages/CreatorReview"; // 🔵 Creator Review page

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("active");

  return (
    <Routes>
      {/* Route without sidebar */}
      <Route path="/" element={<LoginPage />} />

      {/* Routes with sidebar layout */}
      <Route
        element={
          <MainLayout
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        }
      >
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* My Queue */}
        <Route path="/myqueue" element={<MyQueue />} />

        {/* Create Checklist */}
        <Route path="/checklists" element={<CreateDCL />} />

        {/* Deferrals */}
        <Route path="/deferrals" element={<Deferrals />} />

        {/* Completed */}
        <Route path="/completed" element={<Completed />} />

        {/* Active */}
        <Route path="/active" element={<Active />} />

        {/* Reports */}
        <Route path="/reports" element={<Reports />} />

        {/* Home */}
        <Route path="/home" element={<Home />} />

        {/* Hero Tabs */}
        <Route
          path="/hero"
          element={
            <Hero
              showModal={showModal}
              setShowModal={setShowModal}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          }
        />

        {/* Creator Review Route */}
        <Route path="/creator/review/:checklistId" element={<CreatorReview />} />
      </Route>
    </Routes>
  );
}
