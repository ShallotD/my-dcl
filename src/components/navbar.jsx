import React, { useState } from "react";
import { Search } from "lucide-react";

const Navbar = ({ onLogout }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="flex justify-between items-center p-4 bg-[#17A2B8] text-white shadow-md relative w-full">
      {/* Left: User Name */}
      <div className="flex items-center gap-2 font-semibold text-lg">
        👤 John Doe
      </div>

      {/* Center: Search Bar (desktop) */}
      <div className="hidden md:flex items-center bg-[#128f9f] px-3 py-1.5 rounded-lg w-1/3 focus-within:ring-2 focus-within:ring-[#e29700]">
        <Search className="text-gray-200 mr-2" size={18} />
        <input
          type="text"
          placeholder="Search checklists, clients, or documents..."
          className="bg-transparent outline-none w-full text-sm text-white placeholder-gray-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Right: Go For It & Logout Buttons */}
      <div className="flex items-center gap-3">
        <button className="bg-yellow-400 px-3 py-1 rounded font-semibold hover:bg-yellow-500 transition cursor-pointer">
          Go For It
        </button>

        <button
          onClick={() => {
            alert("Logging out");
            if (onLogout) onLogout();
          }}
          className="bg-[#e29700] text-[#333333] px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition"
        >
          🔒 Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
