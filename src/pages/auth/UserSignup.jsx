import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VscError } from "react-icons/vsc";
import { AiOutlineLoading } from "react-icons/ai";
import { FiUserCheck } from "react-icons/fi";
import { PiPasswordDuotone } from "react-icons/pi";

const UserSignup = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showOTPForm, setShowOTPForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (!fullname || !email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/signup`,
        { fullname, email, password }
      );
      if (res.status === 200) {
        setShowOTPForm(true);
      }
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsLoading(false);
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/verify-otp`,
        { email, otp }
      );
      if (res.status === 200) {
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      {!showOTPForm ? (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-800 p-4">
          <div className="bg-gray-900 p-8 rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg">
            <h2 className="text-3xl text-white md:text-4xl font-semibold text-center mb-6">
              Sign Up
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2 text-lg">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 text-lg text-gray-300 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-400 disabled:opacity-50"
                  placeholder="Enter your full name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-2 text-lg">
                  Email
                </label>
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
                <label className="block text-gray-300 mb-2 text-lg">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 text-lg text-gray-300 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-400 disabled:opacity-50"
                  placeholder="Enter your password"
                  value={password}
                  minLength="8"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <p className="text-gray-400 text-[10px] md:text-[12px] mt-1 max-w-md">
                  *Password must be atleast 8 characters long.
                </p>
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
                  "Sign Up"
                )}
              </button>

              <p className="text-gray-500 text-[9px] md:text-[12px] mt-1 max-w-md">
                A random username will be assigned to your account.
              </p>
            </form>

            <p className="text-center text-gray-400 mt-3">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-emerald-400 hover:underline"
              >
                Log In
              </button>
            </p>
          </div>

          <p className="absolute bottom-1 mx-4 text-left text-gray-300 text-[9px] md:text-[11px] mt-6 max-w-md">
            By Signing up, you agree to our
            <span
              onClick={() => navigate("/terms")}
              className="text-emerald-400 hover:underline cursor-pointer"
            >
              {" "}
              {" Terms & Conditions"}
            </span>{" "}
            &
            <span
              onClick={() => navigate("/privacy-policy")}
              className="text-emerald-400 hover:underline cursor-pointer"
            >
              {" "}
              {" Privacy Policy"}
            </span>
            . You also consent to receive calls, WhatsApp, or SMS messages,
            including automated ones, from Shortly and its affiliates.
          </p>
        </div>
      ) : (
        // OTP Form
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 p-4">
          {!showSuccessMessage ? (
            <div className="bg-gray-900 p-8 rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg">
              <div className="flex justify-center items-center mb-4">
                <PiPasswordDuotone className="text-6xl text-emerald-400" />
              </div>
              <h2 className="text-3xl text-white md:text-4xl font-semibold text-center mb-3">
                Verify OTP
              </h2>
              <p className="block text-emerald-400 mb-4 text-sm md:text-xl text-center">
                Please enter the OTP sent to your email to verify your account.
              </p>
              <form onSubmit={handleSubmitOTP}>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2 text-lg">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    maxLength="6"
                    className="w-full px-4 py-3 text-lg text-center text-gray-300 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-400 disabled:opacity-50 tracking-widest"
                    placeholder="******"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
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
                    "Verify OTP"
                  )}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Unverified accounts will be deleted within 15 days
                  automatically.
                </p>
              </form>
            </div>
          ) : (
            // success message
            <div className="bg-gray-900 p-8 rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg">
              <div className="flex justify-center items-center mb-4">
                <FiUserCheck className="text-6xl text-emerald-400" />
              </div>
              <h2 className="text-3xl text-white md:text-4xl font-semibold text-center mb-3">
                Success
              </h2>
              <p className="block text-emerald-400 mb-4 text-sm md:text-xl text-center">
                Thank you for signing up on Shortly! Your account has been
                successfully created.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold py-3 px-6 rounded-md text-lg"
                >
                  Go to Login
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserSignup;
