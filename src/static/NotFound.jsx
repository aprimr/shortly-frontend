import React from "react";
import { useNavigate } from "react-router-dom";
import { BiError } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6 text-center">
      {/* 404 Text & Icon */}
      <h1 className="text-8xl md:text-9xl font-extrabold text-emerald-400">404</h1>

      {/* Error Icon & Message */}
      <div className="flex items-center gap-2 mt-4">
        <h2 className="text-3xl md:text-3xl font-semibold">Page Not Found</h2>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm md:text-base mt-2 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved. <br />
        Please check the URL and try again.
      </p>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 flex items-center gap-2 px-3 py-2 text-xs md:text-sm bg-emerald-400 hover:bg-emerald-500 text-black font-semibold rounded-md transition transform hover:scale-105"
      >
        <IoIosArrowBack className="text-base" />
        Back to Home
      </button>
    </div>
  );
};

export default PageNotFound;
