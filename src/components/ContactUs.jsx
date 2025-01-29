import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
    // Optionally, show a success message to the user
    alert("Thank you for your message. We will get back to you soon!");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <button
        className="btn btn-outline mb-6 flex items-center text-white"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Contact Us
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-control">
          <label htmlFor="name" className="label">
            <span className="label-text text-white">Name</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-gray-800 text-white placeholder-gray-400"
            placeholder="Your Name"
          />
        </div>

        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text text-white">Email</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-gray-800 text-white placeholder-gray-400"
            placeholder="your.email@example.com"
          />
        </div>

        <div className="form-control">
          <label htmlFor="message" className="label">
            <span className="label-text text-white">Message</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full min-h-[150px] bg-gray-800 text-white placeholder-gray-400"
            placeholder="How can we help you?"
          />
        </div>

        <button type="submit" className="btn btn-outline btn-accent w-full">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
