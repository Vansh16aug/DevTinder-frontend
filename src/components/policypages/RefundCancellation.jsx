const RefundCancellation = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Refund and Cancellation Policy
      </h1>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">
              1. Subscription Cancellation
            </h2>
            <p className="mb-2">
              You can cancel your StackBuddy subscription at any time. Here's
              how:
            </p>
            <ul className="list-disc list-inside ml-4">
              <li>Log into your StackBuddy account</li>
              <li>Navigate to 'Account Settings'</li>
              <li>Click on 'Subscription'</li>
              <li>Select 'Cancel Subscription'</li>
            </ul>
            <p className="mt-2">
              Your subscription will remain active until the end of the current
              billing period.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">2. Refund Policy</h2>
            <p className="mb-2">
              We offer a 14-day money-back guarantee for new subscriptions. If
              you're not satisfied with StackBuddy within the first 14 days of
              your subscription, you can request a full refund.
            </p>
            <p>To request a refund:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Contact our support team at support@stackbuddy.com</li>
              <li>Include your account email and reason for the refund</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">3. Partial Refunds</h2>
            <p>
              We do not offer partial refunds for subscription periods beyond
              the initial 14 days. If you cancel your subscription mid-cycle,
              you'll continue to have access to StackBuddy until the end of your
              current billing period.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">
              4. Annual Subscriptions
            </h2>
            <p>
              For annual subscriptions, we offer a prorated refund if you decide
              to cancel after the first 14 days but before the end of the annual
              term. The refund amount will be calculated based on the unused
              portion of your subscription.
            </p>
          </section>

          <div className="alert alert-warning mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>
              Please note that repeated refund requests may result in the
              suspension of your account.
            </span>
          </div>

          <div className="alert alert-info mt-4">
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
              For any questions about our refund policy, please contact our
              support team.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundCancellation;