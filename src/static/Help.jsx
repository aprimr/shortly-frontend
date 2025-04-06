import React, { useState } from "react";
import { LuSend } from "react-icons/lu"; // Plane Icon
import { LuLoader } from "react-icons/lu"; // Spinner Icon

const Help = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true); // Start sending

    // Reset form after sending
    setTimeout(() => {
      setIsSending(false);
      alert("Message Sent! Thank you for your feedback.");
      setTitle("");
      setDescription("");
    }, 2000);
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="w-full max-w-3xl bg-gray-800 p-6 flex flex-col rounded-lg shadow-lg">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-500 mb-2">
            Need Help? We're here for you!
          </h1>
        </header>

        {/* Main Content Section */}
        <main>
          {/* Contact Support Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-emerald-500 mb-4">
              Contact Support
            </h2>
            <p className="text-white mb-4">
              If you have any issues or questions, feel free to reach out to us:
            </p>
            <ul className="text-white space-y-2">
              <li>
                Email us at:{" "}
                <a
                  href="mailto:support@shortly.com"
                  className="text-emerald-500 hover:underline"
                >
                  connect.shortly@gmail.com
                </a>
              </li>
            </ul>
          </section>

          {/* Form Section */}
          <section>
            <h2 className="text-2xl font-semibold text-emerald-500 mb-4">
              Have Any Problem?
            </h2>
            <p className="text-gray-200 mb-3">
              Send us your query, and we'll resolve it as soon as possible.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-white" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter the title of your issue"
                  className="mt-2 p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-white" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your issue in detail"
                  rows="4"
                  minLength="10"
                  className="mt-2 p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  style={{ minHeight: "150px" }}
                  required
                ></textarea>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  disabled={isSending}
                  className={`bg-emerald-500 text-white flex flex-row items-center gap-2 px-6 py-2 rounded-sm transition-all duration-300 ${
                    isSending ? "bg-emerald-600" : "hover:bg-emerald-600"
                  }`}
                >
                  {isSending ? (
                    <>
                      <LuLoader className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>Send Message</>
                  )}
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Help;
