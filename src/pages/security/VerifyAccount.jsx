import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VscError } from "react-icons/vsc";
import { AiOutlineLoading } from "react-icons/ai";
import { FiUserCheck } from "react-icons/fi";
import { PiPasswordDuotone } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";

const VerifyAccount = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showOTPForm, setShowOTPForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const navigate = useNavigate();

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (!email) {
      setError("Please enter your email");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/verify-account`,
        { email }
      );
      if (res.status === 200) {
        setShowOTPForm(true);
      }
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
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
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-800 p-4">
      {!showOTPForm && !showSuccessMessage && (
        <button
          onClick={() => window.history.back()}
          className="absolute px-1 py-1 flex justify-center items-center top-6 left-4 text-emerald-400 bg-gray-900 rounded-md md:text-2xl lg:text-xl"
          disabled={isLoading}
        >
          <IoIosArrowBack className="text-2xl md:text-2xl lg:text-xl" />
        </button>
      )}
      {!showOTPForm ? (
        <div className="bg-gray-900 p-8 rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg">
          <h2 className="text-3xl text-white md:text-4xl font-semibold text-center mb-6">
            Verify Account
          </h2>
          <p className="block text-emerald-400 mb-4 text-sm md:text-xl text-center">
            Enter your email to receive an OTP for verification.
          </p>
          <form onSubmit={handleSubmitEmail}>
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
                "Send OTP"
              )}
            </button>
          </form>
        </div>
      ) : !showSuccessMessage ? (
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
          </form>
        </div>
      ) : (
        <div className="bg-gray-900 p-8 rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg">
          <div className="flex justify-center items-center mb-4">
            <FiUserCheck className="text-6xl text-emerald-400" />
          </div>
          <h2 className="text-3xl text-white md:text-4xl font-semibold text-center mb-3">
            Success
          </h2>
          <p className="block text-emerald-400 mb-4 text-sm md:text-xl text-center">
            Your account has been successfully verified!
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
  );
};

export default VerifyAccount;
