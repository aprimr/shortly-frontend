import React from "react";
import {
  FaBolt,
  FaShieldAlt,
  FaUsers,
  FaChartLine,
  FaLock,
} from "react-icons/fa";
import { RxLinkBreak2 } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12 px-6 md:px-12 lg:px-24">
      {/* Header Section */}
      <header className="text-center mb-12 md:mb-20">
        <h1 className="text-4xl sm:text-3xl md:text-4xl font-bold text-emerald-500">
          About Shortly
        </h1>
        <p className="mt-4 text-lg sm:text-sm md:text-lg max-w-3xl mx-auto">
          Shortly is your go-to URL shortening service, helping you manage and
          share links efficiently. We provide a fast, secure, and user-friendly
          platform to make link sharing effortless.
        </p>
      </header>

      {/* Mission Section */}
      <section className="max-w-4xl text-center mb-5 md:mb-10">
        <h1 className="text-3xl sm:text-2xl md:text-3xl font-semibold text-emerald-500 mb-4">
          Our Mission
        </h1>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <RxLinkBreak2 className="text-emerald-500 text-4xl sm:text-3xl md:text-4xl mb-4" />
          <h3 className="text-xl sm:text-base md:text-xl font-semibold mb-2">
            Easy Link Shortening
          </h3>
          <p className="text-center text-gray-300">
            Shorten long URLs into compact, shareable links in seconds.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaBolt className="text-emerald-500 text-4xl sm:text-3xl md:text-4xl mb-4" />
          <h3 className="text-xl sm:text-base md:text-xl font-semibold mb-2">
            Lightning Fast
          </h3>
          <p className="text-center text-gray-300">
            Our platform is optimized for speed, ensuring instant redirections.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaShieldAlt className="text-emerald-500 text-4xl sm:text-3xl md:text-4xl mb-4" />
          <h3 className="text-xl sm:text-base md:text-xl font-semibold mb-2">
            Secure & Reliable
          </h3>
          <p className="text-center text-gray-300">
            We prioritize security, ensuring your links are safe and protected.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaUsers className="text-emerald-500 text-4xl sm:text-3xl md:text-4xl mb-4" />
          <h3 className="text-xl sm:text-base md:text-xl font-semibold mb-2">
            User-Friendly
          </h3>
          <p className="text-center text-gray-300">
            Our interface is designed to be intuitive and easy to navigate for
            everyone.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaChartLine className="text-emerald-500 text-4xl sm:text-3xl md:text-4xl mb-4" />
          <h3 className="text-xl sm:text-base md:text-xl font-semibold mb-2">
            Analytics & Tracking
          </h3>
          <p className="text-center text-gray-300">
            Track the performance of your links with real-time analytics.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <FaLock className="text-emerald-500 text-4xl sm:text-3xl md:text-4xl mb-4" />
          <h3 className="text-xl sm:text-base md:text-xl font-semibold mb-2">
            Privacy-Focused
          </h3>
          <p className="text-center text-gray-300">
            We respect your privacy and ensure your data remains protected.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
