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
        {/* New Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/myqueue" element={<MyQueue />} />

        <Route path="/checklists" element={<CreateDCL />} />

        <Route path="/deferrals" element={<Deferrals />} />  

        <Route path="/completed" element={<Completed />} />

        <Route path="/active" element={<Active />} /> 
   
        <Route path="/home" element={<Home />} />

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

        <Route
          path="/active"
          element={
            <Hero
              showModal={showModal}
              setShowModal={setShowModal}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              defaultTab="active"
            />
          }
        />


        <Route
          path="/deferrals"
          element={
            <Hero
              showModal={showModal}
              setShowModal={setShowModal}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              defaultTab="deferrals"
            />
          }
        />

        <Route
          path="/completed"
          element={
            <Hero
              showModal={showModal}
              setShowModal={setShowModal}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              defaultTab="completed"
            />
          }
        />
      </Route>
    </Routes>
  );
}



