import React from "react";
import logo from "../assets/images/logo.jpg"

const Header = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Brand Logo */}
          <a href="#" className="text-xl font-bold text-gray-900 dark:text-white flex items-center justify-center">
            <img src={logo} alt="QM" className="h-20 w-20"/><p className="-ml-6">ueryMate</p>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden bg-gray-100 dark:bg-gray-800">
        <a
          href="#features"
          className="block px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          Features
        </a>
        <a
          href="#about"
          className="block px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          About
        </a>
        <a
          href="#contact"
          className="block px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Header;
