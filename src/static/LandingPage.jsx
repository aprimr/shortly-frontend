import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLink,
  FaChartBar,
  FaShieldAlt,
  FaChevronDown,
  FaChevronUp,
  FaUserShield,
  FaTasks,
  FaBolt,
} from "react-icons/fa";

const faqData = [
  {
    question: "How does Shortly work?",
    answer:
      "Simply paste your long URL into the input field, click 'Shorten', and you'll get a short and memorable link to share with others.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes, Shortly is completely free to use for shortening URLs and tracking link performance.",
  },
  {
    question: "Can I customize my shortened URL?",
    answer:
      "Absolutely! You can create a custom alias for your shortened URL to make it more memorable or branded.",
  },
  {
    question: "Will my links expire?",
    answer:
      "You can set expiration dates for your links. Once expired, the link will no longer be accessible.",
  },
  {
    question: "How do I track my links?",
    answer:
      "You can track the clicks and performance of your links through your personalized dashboard.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(null);

  const toggleAnswer = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <section className="text-center py-24 px-6 flex flex-col items-center bg-gray-900">
        <h1 className="text-6xl sm:text-4xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-200">
          Shortly - Simplify Your Links
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mt-6 text-gray-300">
          Convert long links into short, secure, and trackable URLs with ease.
        </p>
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="mt-8 px-8 py-4 text-md sm:text-lg font-semibold rounded-full transition-all duration-300 transform bg-emerald-500 text-gray-900
            hover:bg-gradient-to-r hover:from-pink-500 hover:via-pink-400 hover:to-red-400 hover:text-white hover:text-[25px] hover:scale-110 hover:shadow-lg"
        >
          Get Started
        </button>
      </section>

      <section className="py-20 px-6 max-w-5xl mx-auto text-center text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-emerald-400">
          Why Choose Shortly?
        </h2>
        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-300">
          Fast, reliable, and user-friendly way to shorten your URLs.
        </p>
      </section>

      <section className="bg-gray-800 py-20 px-6 w-full text-center text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
          What We Offer
        </h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-900 p-8 rounded-lg flex flex-col items-center">
            <FaLink className="text-emerald-400 text-5xl mb-6" />
            <h3 className="text-xl sm:text-2xl font-semibold">
              Instant URL Shortening
            </h3>
            <p className="mt-4 text-gray-300 text-sm sm:text-base">
              Quickly shorten long URLs with a single click.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg flex flex-col items-center">
            <FaShieldAlt className="text-emerald-400 text-5xl mb-6" />
            <h3 className="text-xl sm:text-2xl font-semibold">Secure & Fast</h3>
            <p className="mt-4 text-gray-300 text-sm sm:text-base">
              Ensure your links are safe and load quickly.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg flex flex-col items-center">
            <FaChartBar className="text-emerald-400 text-5xl mb-6" />
            <h3 className="text-xl sm:text-2xl font-semibold">
              Analytics & Tracking
            </h3>
            <p className="mt-4 text-gray-300 text-sm sm:text-base">
              Track clicks and monitor link performance.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg flex flex-col items-center">
            <FaBolt className="text-emerald-400 text-5xl mb-6" />
            <h3 className="text-xl sm:text-2xl font-semibold">
              Lightning Fast
            </h3>
            <p className="mt-4 text-gray-300 text-sm sm:text-base">
              Our platform is optimized for speed, ensuring instant
              redirections.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg flex flex-col items-center">
            <FaTasks className="text-emerald-400 text-5xl mb-6" />
            <h3 className="text-xl sm:text-2xl font-semibold">Manage Links</h3>
            <p className="mt-4 text-gray-300 text-sm sm:text-base">
              Organize, edit, and delete your shortened links.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg flex flex-col items-center">
            <FaUserShield className="text-emerald-400 text-5xl mb-6" />
            <h3 className="text-xl sm:text-2xl font-semibold">
              Profile Management
            </h3>
            <p className="mt-4 text-gray-300 text-sm sm:text-base">
              Manage your account settings and profile.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-20 px-6 w-full text-center text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-emerald-400 font-semibold">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 max-w-4xl mx-auto">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-gray-700 py-4">
              <button
                className="flex justify-between text-left items-center w-full text-lg font-medium"
                onClick={() => toggleAnswer(index)}
              >
                {item.question}
                {expanded === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {expanded === index && (
                <p className="mt-2 text-sm md:text-base  text-left text-gray-300">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-800 text-emerald-400 text-center py-20 px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
          Ready to Shorten Your Links?
        </h2>
        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-white">
          Start using Shortly today and make your links more manageable.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 text-md sm:text-lg bg-emerald-400 text-gray-800 font-semibold rounded-sm transform transition duration-300 hover:bg-emerald-500 hover:scale-105"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-2 text-md sm:text-lg bg-transparent border-2 border-emerald-400 text-emerald-400 font-semibold rounded-sm transform transition duration-300 hover:bg-emerald-400 hover:text-gray-800 hover:scale-105"
          >
            Sign Up
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
