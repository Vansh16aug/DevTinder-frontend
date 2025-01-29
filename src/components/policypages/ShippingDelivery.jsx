import React from "react";

const ShippingDelivery = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Service Delivery Policy
      </h1>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">
              1. Account Activation
            </h2>
            <p>
              Upon successful registration and payment (if applicable), your
              StackBuddy account will be activated immediately. You will receive
              a confirmation email with your account details and access
              instructions.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">
              2. Access to Services
            </h2>
            <p className="mb-2">
              Once your account is activated, you will have instant access to
              StackBuddy's features, including:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>Collaborative coding environments</li>
              <li>Learning resources and tutorials</li>
              <li>Community forums and support</li>
              <li>Project management tools</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">
              3. Service Availability
            </h2>
            <p>
              StackBuddy strives to maintain 99.9% uptime. However, occasional
              maintenance or unforeseen technical issues may temporarily affect
              service availability. We will notify users of any planned
              maintenance in advance.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">
              4. Updates and New Features
            </h2>
            <p>
              We regularly update StackBuddy with improvements and new features.
              These updates are automatically delivered to all users and do not
              require any action on your part. We will communicate significant
              changes through email and/or in-app notifications.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">5. Data Backup</h2>
            <p>
              Your projects and data are automatically backed up on our secure
              servers. However, we recommend that you also maintain local
              backups of your important work.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">
              6. Technical Support
            </h2>
            <p>
              If you experience any issues with accessing or using StackBuddy,
              our support team is available to assist you. You can reach us
              through the in-app help center or by emailing
              support@stackbuddy.com.
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
              For any questions about our service delivery, please don't
              hesitate to contact our support team.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDelivery;
