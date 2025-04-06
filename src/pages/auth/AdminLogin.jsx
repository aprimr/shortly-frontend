import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscError } from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-800 p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/login")}
        className="absolute px-1 py-1 flex justify-center items-center top-6 left-4 text-emerald-400 bg-gray-900 rounded-md md:text-2xl lg:text-xl"
        disabled={isLoading}
      >
        <IoIosArrowBack className="text-2xl md:text-2xl lg:text-xl" />
      </button>

      <div className="relative bg-gray-900 p-8 rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg">
        <h2 className="text-3xl flex justify-center items-center gap-2 text-white md:text-4xl font-semibold text-center mb-6"><MdOutlineAdminPanelSettings className="text-emerald-400" /> Admin</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-lg">Username</label>
            <input
              type="email"
              className="w-full px-4 py-3 text-lg text-gray-300 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-400 disabled:opacity-50"
              placeholder="Enter your username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-lg">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 text-lg text-gray-300 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-400 disabled:opacity-50"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-lg">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 text-lg text-gray-300 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-400 disabled:opacity-50"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Error Section */}
          {error && (
            <div className="flex items-center text-rose-500 tracking-wider text-sm mb-2 rounded-md">
              <VscError className="text-base text-rose-500 mr-1" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center items-center bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 text-lg rounded transition disabled:bg-emerald-700 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading className="text-white animate-spin text-2xl" />
            ) : (
              "Login as Admin"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
