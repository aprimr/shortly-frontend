import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscError } from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { LoginUser } from "../../store/slices/auth.slice";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`,
        { email, password }
      );
      if (res.status === 200) {
        setIsLoading(false);
        dispatch(LoginUser({ user: res.data.user, token: res.data.token }));
      }
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-800 p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute px-1 py-1 flex justify-center items-center top-6 left-4 text-emerald-400 bg-gray-900 rounded-md md:text-2xl lg:text-xl"
        disabled={isLoading}
      >
        <IoIosArrowBack className="text-2xl md:text-2xl lg:text-xl" />
      </button>

      <div className="relative bg-gray-900 p-8 rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg">
        {/* Admin Login Btn */}
        {/* <button
          onClick={() => navigate("/admin/login")}
          className="absolute px-1 py-1 flex justify-center items-center top-6 right-4 text-emerald-400 bg-gray-800 rounded-md md:text-2xl lg:text-xl"
          disabled={isLoading}
        >
          <MdOutlineAdminPanelSettings className="text-2xl md:text-3xl lg:text-3xl" />
        </button> */}
        <h2 className="text-3xl text-white md:text-4xl font-semibold text-center mb-6">
          Log In
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 text-lg">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 text-lg text-gray-300 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-400 disabled:opacity-50"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              disabled={isLoading}
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-300 mb-2 text-lg">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 text-lg text-gray-300 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-400 disabled:opacity-50"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-emerald-500 text-sm md:text-base mt-2 max-w-md hover:underline"
            >
              Forgot password?
            </button>
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
              "Log In"
            )}
          </button>
        </form>

        <p className="text-left text-gray-400 mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-emerald-400 hover:underline"
          >
            Sign Up
          </button>
        </p>
        <button
          onClick={() => navigate("/verify-account")}
          className="text-emerald-500 mt-2 max-w-md hover:underline"
        >
          Verify your account.
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
