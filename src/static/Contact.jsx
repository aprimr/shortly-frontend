import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6 md:px-12 lg:px-24">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-emerald-500">
          Get in Touch
        </h1>
        <p className="mt-4 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
          We're here to help! Reach out to us through any of the methods below,
          and we'll get back to you as soon as possible.
        </p>
      </header>

      {/* Contact Info Section */}
      <section className="max-w-4xl mx-auto mb-12 grid gap-8 md:grid-cols-2">
        {/* Contact Details */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-emerald-500 mb-4">
            Contact Information
          </h2>
          <ul className="text-sm sm:text-base md:text-lg text-gray-300">
            <li className="mb-2">
              <span className="font-semibold">Email:</span>{" "}
              connect.shortly@gmail.com
            </li>
          </ul>

          {/* Social Media Links */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-emerald-500 mt-6 mb-4">
            Follow Us
          </h3>
          <div className="flex flex-col gap-5">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm sm:text-base md:text-lg"
            >
              <FaFacebook className="text-white text-2xl md:text-3xl" />
              <span className="text-gray-300">Facebook</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm sm:text-base md:text-lg"
            >
              <FaTwitter className="text-white text-2xl md:text-3xl" />
              <span className="text-gray-300">Twitter</span>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm sm:text-base md:text-lg"
            >
              <FaInstagram className="text-white text-2xl md:text-3xl" />
              <span className="text-gray-300">Instagram</span>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm sm:text-base md:text-lg"
            >
              <FaLinkedin className="text-white text-2xl md:text-3xl" />
              <span className="text-gray-300">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-emerald-500 mb-4">
            Send Us a Message
          </h2>
          <form action="#" method="POST" className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm sm:text-base md:text-lg font-semibold text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm sm:text-base md:text-lg font-semibold text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm sm:text-base md:text-lg font-semibold text-gray-300 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
