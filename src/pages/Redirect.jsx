import React, { useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import { BiErrorCircle } from "react-icons/bi";

import axios from "axios";

function Redirect() {
  const navigate = useNavigate();
  const [redirectUrl, setRedirectUrl] = useState("");
  const [error, setError] = useState("");
  const { shortId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setError("");

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/urls/data/${shortId}`
        );
        window.location.href = response.data.urlDetails.longUrl;
        setRedirectUrl(response.data.urlDetails.longUrl);
      } catch (error) {
        console.log(error);
        setError(error?.response?.data?.message || "An error occurred");
      }
    };

    fetchData();
  }, [shortId]);

  return (
    <>
      {!error ? (
        <div className="relative flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center">
          <div className="text-4xl font-bold mb-4 text-emerald-400 flex flex-row justify-center items-center gap-2">
            Redirecting
            <VscLoading className="text-2xl text-emerald-400 animate-spin" />
          </div>
          <p className="text-lg mb-6">
            You will be redirected to{" "}
            <span className="text-emerald-400">
              {import.meta.env.VITE_FRONTEND_URL}/{shortId}
            </span>{" "}
            shortly.
          </p>
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-lg font-semibold bg-emerald-400 text-gray-900 px-6 py-3 rounded-lg shadow-md hover:bg-emerald-500 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50"
          >
            <FaArrowCircleLeft className="mr-2 text-xl" /> Cancel redirect
          </button>
          <p className="absolute bottom-32 text-sm text-gray-100">
            Or{" "}
            <a href={redirectUrl} className="text-emerald-400">
              {" "}
              click here{" "}
            </a>{" "}
            if not redirected automatically.
          </p>
        </div>
      ) : (
        <div className="relative flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center">
          <div className="text-7xl font-bold mb-2 text-rose-500 flex flex-row justify-center items-center gap-2">
            404 Error
          </div>
          <p className="text-md mb-6 text-white">
            There was an error redirecting you.
          </p>
          {error && (
            <p className="text-2xl flex flex-row items-center gap-2 justify-center text-white-100 mb-8">
              <BiErrorCircle />
              {error}
              <BiErrorCircle />
            </p>
          )}
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center text-lg font-semibold bg-emerald-400 text-gray-900 px-6 py-3 rounded-lg shadow-md hover:bg-emerald-500 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50"
          >
            Back to home
          </button>
        </div>
      )}
    </>
  );
}

export default Redirect;
