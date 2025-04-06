import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginUser, LogoutUser } from "../store/slices/auth.slice";

const SecondaryFooter = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const dispatch = useDispatch();

  const handleLogoutBtn = () => {
    dispatch(LoginUser({ user: null, token: null }));
    dispatch(LogoutUser());
    setShowLogoutDialog(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutDialog(false);
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        {/* sm */}
        <div className="flex flex-col items-center space-y-4 md:hidden">
          {/* Links */}
          <div className="flex flex-wrap text-sm justify-center gap-4">
            <NavLink
              to="/home"
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              Home
            </NavLink>
            <NavLink
              to="/profile"
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              Profile
            </NavLink>
            <NavLink
              to="/analytics"
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              Analytics
            </NavLink>
            <button
              onClick={() => setShowLogoutDialog(!showLogoutDialog)}
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              Logout
            </button>
            <NavLink
              to="/help"
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              Help
            </NavLink>
          </div>
          {/* Social */}
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
        </div>

        {/* md */}
        <div className="hidden md:flex justify-between items-center">
          {/* Links */}
          <div className="flex space-x-6">
            <NavLink
              to="/home"
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              Home
            </NavLink>
            <NavLink
              to="/profile"
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              Profile
            </NavLink>
            <NavLink
              to="/analytics"
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              Analytics
            </NavLink>
            <button
              onClick={() => setShowLogoutDialog(!showLogoutDialog)}
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              Logout
            </button>
            <NavLink
              to="/help"
              className="text-emerald-400 hover:text-emerald-300 transition"
            >
              Help
            </NavLink>
          </div>

          {/* Social */}
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

      {/* Logout */}
      {showLogoutDialog && (
        <div className="fixed h-[100vh] inset-0 flex items-center justify-center z-20 bg-black bg-opacity-60">
          <div className="bg-gray-900 p-6 rounded-lg shadow-md w-80">
            <h3 className="text-lg font-semibold text-gray-100">
              Are you sure you want to logout?
            </h3>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleCancelLogout}
                className="px-4 py-2 bg-gray-600 text-white rounded transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutBtn}
                className="px-4 py-2 bg-red-600 text-white rounded transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default SecondaryFooter;
