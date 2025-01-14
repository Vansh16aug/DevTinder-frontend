import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    gender: "",
    photoUrl: "",
    about: "",
    skills: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const skillsArray = formData.skills
        .split(",")
        .map((skill) => skill.trim());
      const dataToSend = {
        ...formData,
        skills: skillsArray,
        age: parseInt(formData.age, 10),
      };

      const response = await axios.post(`${BACKEND_URL}/signup`, dataToSend);
      navigate("/login");
      toast.success(response.data.message);
      // Reset form or redirect user after successful signup
      setFormData({
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        age: "",
        gender: "",
        photoUrl: "",
        about: "",
        skills: "",
      });
    } catch (error) {
      toast.error(error.response?.data || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4">
        <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
          <div className="card-body">
            <h1 className="card-title text-3xl mb-6">Signup</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Age</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Gender</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="select select-bordered"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="url"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">About</span>
                </label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  className="textarea textarea-bordered"
                  rows="3"
                ></textarea>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Skills (comma-separated)</span>
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
