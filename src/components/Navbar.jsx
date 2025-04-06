import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user) || {};

  const firstname = user.fullname ? user.fullname.split(" ", 1)[0] : "";

  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 text-white border-b border-gray-800 shadow-md top-0 w-full z-10 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-20 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => navigate("/")}
            className="text-3xl sm:text-3xl md:text-4xl font-semibold text-white cursor-pointer"
          >
            Shortly
          </button>
        </div>

        {/* Login Button or User's First Name */}
        {!user?.fullname ? (
          <div>
            <NavLink
              to="/login"
              className="bg-emerald-400 text-gray-900 px-4 sm:px-5 py-2 text-base sm:text-lg font-semibold rounded-xs hover:bg-emerald-500 transition duration-300"
            >
              Login
            </NavLink>
          </div>
        ) : (
          <NavLink
            to="/profile"
            className="max-w-36 overflow-hidden bg-emerald-400 flex flex-row gap-2 justify-start items-center text-gray-900 pl-2 pr-4 py-2 text-base sm:text-lg font-medium rounded-full"
          >
            <img
              src={user.profilePic}
              alt="profile-pic"
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover border-2 border-gray-100"
            />
            <p className="text-xl truncate max-w-full">{firstname}</p>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
