import { Link } from "react-router-dom";

const PP = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl text-white">
      <Link to="/" className="text-white hover:text-gray-300 transition-colors">
        Back
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="mb-4">
          Welcome to our Privacy Policy. Your privacy is critically important to
          us. This Privacy Policy document contains types of information that is
          collected and recorded by our website and how we use it.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          2. Information We Collect
        </h2>
        <p className="mb-4">
          We collect information you provide directly to us, such as when you
          create or modify your account, request services, contact customer
          support, or otherwise communicate with us. This information may
          include: name, email address, phone number, postal address, profile
          picture, and other information you choose to provide.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          3. How We Use Your Information
        </h2>
        <p className="mb-4">We use the information we collect to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and send related information</li>
          <li>
            Send you technical notices, updates, security alerts, and support
            messages
          </li>
          <li>Respond to your comments, questions, and requests</li>
          <li>
            Communicate with you about products, services, offers, promotions,
            and events
          </li>
          <li>
            Monitor and analyze trends, usage, and activities in connection with
            our services
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          4. Sharing of Information
        </h2>
        <p className="mb-4">
          We may share the information we collect about you as described in this
          Privacy Policy or as described at the time of collection or sharing,
          including as follows:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            With third-party vendors, consultants, and other service providers
            who need access to such information to carry out work on our behalf
          </li>
          <li>
            In response to a request for information if we believe disclosure is
            in accordance with, or required by, any applicable law, regulation,
            or legal process
          </li>
          <li>
            If we believe your actions are inconsistent with our user agreements
            or policies, or to protect the rights, property, and safety of us or
            any third party
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
        <p className="mb-4">
          We take reasonable measures to help protect information about you from
          loss, theft, misuse and unauthorized access, disclosure, alteration,
          and destruction.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          6. Changes to this Privacy Policy
        </h2>
        <p className="mb-4">
          We may change this Privacy Policy from time to time. If we make
          changes, we will notify you by revising the date at the top of the
          policy and, in some cases, we may provide you with additional notice
          (such as adding a statement to our homepage or sending you a
          notification).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us
          at: privacy@example.com
        </p>
      </section>
    </div>
  );
};

export default PP;
