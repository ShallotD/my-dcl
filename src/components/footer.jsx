import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#4B2E2E] text-white mt-10 py-4 px-6 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">

        <p className="text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">NCBA Bank</span>. All rights reserved.
        </p>

        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300 transition">Terms of Use</a>
          <a href="#" className="hover:text-gray-300 transition">Support</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
