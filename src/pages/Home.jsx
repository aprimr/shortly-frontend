import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import validator from "validator";
import QRCode from "react-qr-code";
import HeroImg from "../assets/HeroImg.png";

import { MdContentCopy } from "react-icons/md";
import { FiCheck } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import { RiResetLeftFill } from "react-icons/ri";
import { VscError } from "react-icons/vsc";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";

import { exportComponentAsPNG } from "react-component-export-image";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [validUrl, setValidUrl] = useState(false);
  const [shortId, setShortId] = useState("");
  const [showResultPage, setShowResultPage] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [advanceError, setAdvanceError] = useState("");
  const [selectedExpiry, setSelectedExpiry] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || {});

  const imageRef = useRef();

  const navigate = useNavigate();
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const options = {
      protocols: ["http", "https"],
      require_tld: true,
      require_protocol: false,
      require_host: true,
      require_port: false,
      require_valid_protocol: true,
      allow_underscores: false,
      host_whitelist: false,
      host_blacklist: false,
      allow_trailing_dot: false,
      allow_protocol_relative_urls: false,
      allow_fragments: true,
      allow_query_components: true,
      disallow_auth: false,
      validate_length: true,
    };
    const result = validator.isURL(originalUrl, options);
    result ? setValidUrl(true) : setValidUrl(false);
  }, [originalUrl]);

  const handleShorten = async () => {
    setError("");
    setAdvanceError("");
    setIsloading(false);
    if (!validUrl) {
      return;
    }
    if (expiryDate && expiryDate < currentDate) {
      setAdvanceError("Invalid expiry date");
      return;
    }

    try {
      setIsloading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/urls/short-url`,
        {
          username: user.username,
          longUrl: originalUrl,
          customId: shortId,
          expiresOn: expiryDate,
        }
      );
      if (res.status === 200) {
        setShowResultPage(true);
        setShortId(res.data.shortId);
      }
    } catch (error) {
      setError(error.response.data.message);
      setShowResultPage(false);
      setIsloading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBack = () => {
    setShortId("");
    setOriginalUrl("");
    setShowResultPage(false);
    setIsloading(false);
    setExpiryDate("");
    setSelectedExpiry("");
    setShowAdvanceOptions(false);
  };

  const handleAdvanceOptions = () => {
    setShowAdvanceOptions(!showAdvanceOptions);
  };

  const handleExpirySelection = (days) => {
    const today = new Date();
    today.setDate(today.getDate() + days);
    setExpiryDate(today.toISOString().split("T")[0]);
    setSelectedExpiry(days);
  };

  const handleClearExpiryBtn = () => {
    setExpiryDate("");
    setSelectedExpiry("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white py-10 px-4 relative">
      {!showResultPage && (
        <img
          src={HeroImg}
          alt="URL Shortener"
          className="w-64 md:w-80 mx-auto mb-6"
        />
      )}

      {!showResultPage ? (
        <div className="w-full max-w-xl bg-gray-800 p-8 rounded-lg shadow-xl text-center space-y-6">
          <h1 className="text-3xl font-semibold text-white">
            Enter Long URL Here
          </h1>

          <div>
            <input
              type="text"
              className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter your long URL"
              value={originalUrl}
              disabled={isLoading}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
            <p className="text-sm text-rose-500 text-left mt-2">{error}</p>
            {!validUrl && (
              <p className="text-sm text-rose-500 text-left mt-2">
                Please enter a valid url
              </p>
            )}
          </div>

          <button
            onClick={handleAdvanceOptions}
            className={`text-sm md:text-md text-emerald-500 text-left flex items-center ${
              isLoading && "opacity-90"
            }`}
            disabled={isLoading}
          >
            Advanced options
            {!showAdvanceOptions ? (
              <MdOutlineKeyboardArrowDown className="text-xl" />
            ) : (
              <MdOutlineKeyboardArrowUp className="text-xl" />
            )}
          </button>

          {showAdvanceOptions && (
            <div className="w-full bg-gray-900 text-sm rounded-md py-4 px-4">
              <p className="text-left flex flex-row gap-1">
                Custom URL
                <span className="text-[10px] flex items-end text-gray-500">
                  (optional)
                </span>
              </p>
              <input
                type="text"
                placeholder="Enter custom short id"
                value={shortId}
                maxLength={50}
                onChange={(e) => setShortId(e.target.value)}
                className="h-10 w-full px-2 bg-gray-700 mt-2 rounded-sm outline-none"
              />
              <p className="text-left mt-2 flex flex-row gap-1 items-center">
                Expires on
                <RiResetLeftFill
                  onClick={handleClearExpiryBtn}
                  className="bg-gray-950 text-[12px] text-emerald-500 rounded-sm hover:scale-125"
                />
                <span className="text-[10px] flex items-end text-gray-500">
                  (optional)
                </span>
              </p>
              <div className="flex gap-2 flex-wrap mt-2">
                {[1, 3, 5, 7, 30].map((days) => (
                  <button
                    key={days}
                    onClick={() => handleExpirySelection(days)}
                    className={`px-3 py-[5px] rounded-md ${
                      selectedExpiry === days
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-700 text-gray-300"
                    }`}
                  >
                    {days === 7
                      ? "1 Week"
                      : days === 30
                      ? "1 Month"
                      : `${days} Day${days > 1 ? "s" : ""}`}
                  </button>
                ))}
              </div>
              <div className="relative flex items-center mt-6 mb-4">
                <hr className="flex-grow border-t-2 border-gray-700" />
                <span className="absolute left-1/2 -translate-x-1/2 bg-gray-900 px-5 text-white">
                  OR
                </span>
              </div>

              <p className="text-[12px] text-left mt-2 flex flex-row gap-2 items-center text-gray-400">
                Custom expiry date
              </p>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="h-8 w-full px-2 bg-gray-700 mt-2 rounded-sm outline-none"
              />

              {advanceError && (
                <p className="text-xs text-rose-500 text-left flex flex-row items-center gap-2 mt-2">
                  <VscError />
                  {advanceError}
                </p>
              )}
            </div>
          )}

          <button
            onClick={handleShorten}
            className={`w-full py-3 text-md text-center flex justify-center sm:text-lg font-semibold rounded-md transition-all duration-300 transform 
              bg-emerald-500 text-gray-900 hover:bg-gradient-to-r hover:from-pink-500 hover:via-pink-400 hover:to-red-400 hover:text-white hover:shadow-lg 
              ${
                isLoading
                  ? "cursor-not-allowed opacity-80 bg-gradient-to-r from-pink-500 via-pink-400 to-red-400 text-white"
                  : "hover:scale-95 hover:text-2xl"
              }
            `}
            disabled={isLoading}
          >
            {!isLoading ? (
              "Shorten URL"
            ) : (
              <AiOutlineLoading className="animate-spin text-3xl sm:text-2xl opacity-100" />
            )}
          </button>

          <button
            onClick={() => navigate("/analytics")}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold py-3 rounded-md transition mt-4"
          >
            View All URLs
          </button>
        </div>
      ) : (
        <div className="w-full max-w-6xl mx-auto text-center space-y-6">
          {/* Title */}
          <h1 className="text-3xl font-semibold text-white">
            Shortened URL Result
          </h1>

          <div className="flex flex-col md:flex-row gap-6">
            {/* URL Details Container */}
            <div className="flex-1 flex flex-col justify-center bg-gray-800 p-6 rounded-lg shadow-xl space-y-4">
              {/* Original URL */}
              <div className="text-left">
                <strong className="text-white block mb-1">Original URL:</strong>
                <div className="bg-gray-700 p-3 rounded-md text-gray-300 text-sm break-all">
                  {originalUrl}
                </div>
              </div>

              {/* Shortened URL */}
              <div className="text-left">
                <strong className="text-white block mb-1">
                  Shortened URL:
                </strong>
                <div className="mt-3 p-4 bg-gray-700 rounded-lg flex justify-between items-center">
                  <a
                    target="_blank"
                    href={`${import.meta.env.VITE_FRONTEND_URL}/${shortId}`}
                    className="overflow-x-scroll truncate text-emerald-500 text-lg o"
                  >
                    {import.meta.env.VITE_FRONTEND_URL}/{shortId}
                  </a>
                  <button
                    onClick={handleCopy}
                    className="ml-2 text-white hover:text-emerald-500"
                  >
                    {copied ? (
                      <FiCheck className="text-emerald-500 text-xl" />
                    ) : (
                      <MdContentCopy className="text-xl" />
                    )}
                  </button>
                </div>
              </div>
              {/* Expires */}
              <div className="text-left">
                <strong className="text-white block mb-1">Expires On:</strong>
                <div className="bg-gray-700 px-3 py-2 rounded-md text-gray-300 text-sm break-all">
                  {expiryDate || "Never"}
                </div>
              </div>
            </div>

            {/* QR Code Container */}
            <div className="flex-none bg-gray-800 p-8 rounded-lg shadow-xl flex items-center justify-center">
              <div
                ref={imageRef}
                className="p-4 flex justify-center items-center border-2 rounded-sm border-emerald-500 bg-gray-900"
              >
                <QRCode
                  value={`${import.meta.env.VITE_FRONTEND_URL}/${shortId}`}
                  size={250}
                  level="Q"
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                    width: "100%",
                  }}
                  bgColor="#111827"
                  fgColor="#ffffff"
                  className="rounded-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Download QR Code Button */}
            <button
              onClick={() => {
                exportComponentAsPNG(imageRef);
              }}
              className="w-60 px-5 bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold py-3 rounded-lg transition mx-auto"
            >
              Download QR Code
            </button>

            {/* Back Button */}
            <button
              onClick={handleBack}
              className="w-40 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition mx-auto "
            >
              <IoMdArrowBack className="inline mr-2" /> Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
