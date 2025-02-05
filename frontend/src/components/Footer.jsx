import React from "react";
import ImprintModal from "../components/Modal/ImprintModal";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 py-6">
      <div className="max-w-screen-xl mx-auto px-4 text-center flex justify-between items-center">
        <p className="text-gray-500 dark:text-gray-400">
          © 2025 Querymate. All rights reserved. - Developed by TECHBLEND
        </p>
        <ImprintModal />
      </div>
    </footer>
  );
};

export default Footer;
