import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VscError } from "react-icons/vsc";
import { AiOutlineLoading } from "react-icons/ai";
import { FiUserCheck } from "react-icons/fi";
import { PiPasswordDuotone } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showOTPForm, setShowOTPForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
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
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/verify-email`,
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
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/verify-reset-pass-otp`,
        { email, otp }
      );
      if (res.status === 200) {
        setShowPasswordForm(true);
      }
      setIsLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/update-password`,
        { email, password: newPassword }
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
      {!showOTPForm && !showPasswordForm && !showSuccessMessage && (
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
            Forgot Password
          </h2>
          <p className="block text-emerald-400 mb-4 text-sm md:text-xl text-center">
            Enter your email to receive an OTP for password reset.
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
      ) : !showPasswordForm ? (
        <div className="bg-gray-900 p-8 rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg">
          <div className="flex justify-center items-center mb-4">
            <PiPasswordDuotone className="text-6xl text-emerald-400" />
          </div>
          <h2 className="text-3xl text-white md:text-4xl font-semibold text-center mb-3">
            Verify OTP
          </h2>
          <p className="block text-emerald-400 mb-4 text-sm md:text-xl text-center">
            Please enter the OTP sent to your email to reset your password.
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
      ) : !showSuccessMessage ? (
        <div className="bg-gray-900 p-8 rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg">
          <h2 className="text-3xl text-white md:text-4xl font-semibold text-center mb-6">
            Set New Password
          </h2>
          <p className="block text-emerald-400 mb-4 text-sm md:text-xl text-center">
            Enter your new password and confirm it.
          </p>
          <form onSubmit={handleSubmitNewPassword}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2 text-lg">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 text-lg text-gray-300 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-400 disabled:opacity-50"
                placeholder="New password"
                value={newPassword}
                minLength={8}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-300 mb-2 text-lg">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 text-lg text-gray-300 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-emerald-400 disabled:opacity-50"
                placeholder="Confirm password"
                value={confirmPassword}
                minLength={8}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
              <p className="text-[10px] text-gray-400 mt-1">
                *Passwords must be atleast 8 characters long
              </p>
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
                "Change Password"
              )}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-gray-900 p-8 rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg">
          <div className="flex justify-center items-center mb-4">
            <FiUserCheck className="text-6xl text-emerald-400" />
          </div>
          <h2 className="text-3xl text-white md:text-4xl font-semibold text-center mb-6">
            Password Reset Successful
          </h2>
          <p className="text-emerald-400 mb-4 text-lg text-center">
            Your password has been successfully reset! You can now login with
            your new password.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full flex justify-center items-center bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 text-lg rounded transition"
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
