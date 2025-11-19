// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  ListCheck,
  Clock,
  CheckCircle,
  BarChart2,
  LogOut,
  CirclePlus,
} from "lucide-react";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-2 py-1 rounded hover:bg-[#2A1F63] ${
      isActive ? "bg-[#2A1F63]" : ""
    }`;

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-[#3A2A82] text-white p-4 flex flex-col justify-between">
      {/* Logo / Brand */}
      <div>
        <h2 className="text-2xl font-bold mb-4">BankFlow</h2>
        <div className="text-sm mb-6">
          <p>michael m n</p>
          <p className="text-gray-300">Sales Officer</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          <NavLink to="/home" className={linkClass}>
            <Home size={12} className="text-gray-200" />
            Dashboard
          </NavLink>

          <NavLink to="/checklists" className={linkClass}>
            {/* CirclePlus icon for “Create New DCL” */}
            <CirclePlus size={12} className="text-gray-200" />
            Create New DCL
          </NavLink>

          <NavLink to="/accounts" className={linkClass}>
            <Users size={12} className="text-gray-200" />
            View Accounts
          </NavLink>

          <NavLink to="/active-checklists" className={linkClass}>
            <ListCheck size={12} className="text-gray-200" />
            Active 
          </NavLink>

          <NavLink to="/deferrals" className={linkClass}>
            <Clock size={12} className="text-gray-200" />
            Deferrals
          </NavLink>

          <NavLink to="/completed-checklists" className={linkClass}>
            <CheckCircle size={12} className="text-gray-200" />
            Completed 
          </NavLink>

          <NavLink to="/reports" className={linkClass}>
            <BarChart2 size={12} className="text-gray-200" />
            Reports
          </NavLink>
        </nav>
      </div>

      {/* Bottom / Logout */}
      <div>
        <NavLink to="/logout" className={linkClass}>
          <LogOut size={20} className="text-gray-200" />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;






