import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        {/* Small Screens (sm) */}
        <div className="flex flex-col items-center space-y-4 md:hidden">
          <div className="flex flex-wrap text-sm justify-center gap-4">
            <NavLink
              to="/forgot-password"
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              Forgot Password
            </NavLink>
            <NavLink
              to="/verify-account"
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              Verify Account
            </NavLink>
            <NavLink
              to="/about"
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              Contact
            </NavLink>
            <NavLink
              to="/terms-and-privacy"
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              Terms & Privacy
            </NavLink>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              target="_blank"
              href="https://github.com/aprimr"
              className="text-gray-300 hover:text-emerald-400 transition"
            >
              GitHub
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/aprimregmi0/"
              className="text-gray-300 hover:text-emerald-400 transition"
            >
              LinkedIn
            </a>
            <a
              target="_blank"
              href="https://www.x.com/aprimre"
              className="text-gray-300 hover:text-emerald-400 transition"
            >
              Twitter
            </a>
          </div>
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} Shortly. All rights reserved.
          </p>
        </div>

        {/* Medium & Larger Screens (md and up) */}
        <div className="hidden md:flex gap-2 flex-col">
          {/* Top Row - Navigation Links Centered */}
          <div className="flex justify-center space-x-6 mb-4">
            <NavLink
              to="/forgot-password"
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              Forgot Password
            </NavLink>
            <NavLink
              to="/verify-account"
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              Verify Account
            </NavLink>
            <NavLink
              to="/about"
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              Contact
            </NavLink>
            <NavLink
              to="/terms-and-privacy"
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              Terms & Privacy
            </NavLink>
          </div>
          {/* Bottom Row - Copyright Left, Social Right */}
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Shortly. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                target="_blank"
                href="https://github.com/aprimr"
                className="text-gray-300 hover:text-emerald-400 transition"
              >
                GitHub
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/aprimregmi0/"
                className="text-gray-300 hover:text-emerald-400 transition"
              >
                LinkedIn
              </a>
              <a
                target="_blank"
                href="https://www.x.com/aprimre"
                className="text-gray-300 hover:text-emerald-400 transition"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
