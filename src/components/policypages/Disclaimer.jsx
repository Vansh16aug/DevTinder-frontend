import React from "react";

const Disclaimer = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Disclaimer</h1>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">
            Important Information for StackBuddy Users
          </h2>

          <section className="mb-4">
            <h3 className="text-xl font-semibold mb-2">
              1. Educational Purpose
            </h3>
            <p>
              StackBuddy is designed for educational and collaborative purposes
              only. The platform and its content should not be considered as
              professional advice.
            </p>
          </section>

          <section className="mb-4">
            <h3 className="text-xl font-semibold mb-2">
              2. User-Generated Content
            </h3>
            <p>
              The majority of content on StackBuddy is user-generated. We do not
              guarantee the accuracy, completeness, or usefulness of any
              information on the platform.
            </p>
          </section>

          <section className="mb-4">
            <h3 className="text-xl font-semibold mb-2">3. Code Execution</h3>
            <p>
              Users are responsible for reviewing and understanding any code
              before execution. StackBuddy is not liable for any damages or
              losses resulting from the use of code shared on the platform.
            </p>
          </section>

          <section className="mb-4">
            <h3 className="text-xl font-semibold mb-2">4. Privacy and Data</h3>
            <p>
              While we strive to protect your information, we cannot guarantee
              absolute security. Please be mindful of the personal information
              you share on the platform.
            </p>
          </section>

          <section className="mb-4">
            <h3 className="text-xl font-semibold mb-2">5. Third-Party Links</h3>
            <p>
              StackBuddy may contain links to third-party websites. We are not
              responsible for the content or privacy practices of these external
              sites.
            </p>
          </section>

          <div className="alert alert-info mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              By using StackBuddy, you acknowledge that you have read and
              understood this disclaimer.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
