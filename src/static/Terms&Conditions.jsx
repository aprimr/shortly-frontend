import React from "react";

const TermsAndPrivacy = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6 lg:px-24">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-emerald-500">
          Terms & Privacy
        </h1>
        <p className="mt-4 text-sm sm:text-xs md:text-lg lg:text-xl max-w-3xl mx-auto">
          Please read these carefully before using the Shortly service.
        </p>
      </header>

      {/* Terms and Conditions Section */}
      <section className="max-w-4xl mx-auto text-gray-300 mb-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-500 mb-6">
          Terms and Conditions
        </h2>

        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-emerald-400">
          1. Introduction
        </h3>
        <p className="text-base md:text-lg mb-4">
          These Terms and Conditions govern your use of the Shortly website and
          services. By accessing or using the Shortly platform, you agree to
          comply with these terms.
        </p>

        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-emerald-400">
          2. Account Creation
        </h3>
        <p className="text-base md:text-lg mb-4">
          To use certain features of Shortly, you may need to create an account.
          You agree to provide accurate and up-to-date information during the
          registration process.
        </p>

        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-emerald-400">
          3. Usage Restrictions
        </h3>
        <p className="text-base md:text-lg mb-4">
          You may not use the Shortly platform for illegal or unauthorized
          purposes. You are responsible for ensuring that your use of the
          service does not infringe on any laws.
        </p>

        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-emerald-400">
          4. Modifications
        </h3>
        <p className="text-base md:text-lg mb-4">
          Shortly reserves the right to modify or terminate the service at any
          time. We may also update these Terms and Conditions from time to time,
          so please review them periodically.
        </p>

        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-emerald-400">
          5. Limitation of Liability
        </h3>
        <p className="text-base md:text-lg mb-4">
          Shortly will not be liable for any damages or loss of data arising
          from the use of our service. By using the platform, you agree to use
          it at your own risk.
        </p>

        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-emerald-400">
          6. Governing Law
        </h3>
        <p className="text-base md:text-lg mb-2">
          These Terms and Conditions are governed by the laws of Nepal. Any
          disputes will be subject to the exclusive jurisdiction of the courts
          in Nepal.
        </p>
      </section>

      {/* Privacy Policy Section */}
      <section className="max-w-4xl mx-auto text-gray-300">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-500 mb-6">
          Privacy Policy
        </h2>

        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-emerald-400">
          1. Data Collection
        </h3>
        <p className="text-base md:text-lg mb-4">
          We may collect personal information such as your name, email address,
          and usage data to improve our services and user experience.
        </p>

        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-emerald-400">
          2. Data Usage
        </h3>
        <p className="text-base md:text-lg mb-4">
          Your data is used to enhance the performance of the Shortly platform,
          respond to inquiries, and send important updates.
        </p>

        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-emerald-400">
          3. Data Protection
        </h3>
        <p className="text-base md:text-lg mb-4">
          We implement strict security measures to protect your personal
          information from unauthorized access, alteration, or disclosure.
        </p>

        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-emerald-400">
          4. Consent
        </h3>
        <p className="text-base md:text-lg mb-4">
          By using our services, you consent to the collection and use of your
          data as described in this Privacy Policy.
        </p>

        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-emerald-400">
          5. Contact
        </h3>
        <p className="text-base md:text-lg mb-2">
          If you have any questions or concerns regarding your privacy or data,
          please contact us at:
        </p>
        <p className="text-emerald-500 text-base md:text-lg">
          connect.shortly@gmail.com
        </p>
      </section>
    </div>
  );
};

export default TermsAndPrivacy;
