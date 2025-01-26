import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/config";
import { toast } from "react-hot-toast";
import axios from "axios";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    emailId: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/login`, loginData, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
      navigate("/");
      toast.success("Login successful");
    } catch (err) {
      if (err?.response?.data) {
        toast.error(err.response.data);
      } else {
        toast.error("An error occurred during login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/signup`, signupData, {
        withCredentials: true,
      });
      dispatch(addUser(response.data.data));
      navigate("/profile");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gray-50">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/vanshstorage/image/upload/v1737282756/MicrosoftTeams-image-38-1_t30yp2.webp"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-70" />
      </div>

      {/* Content */}
      <div className="z-10 w-full max-w-4xl p-8 space-y-8">
        {/* Quote */}
        <div className="text-white text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">Welcome Back</h2>
          <p className="text-xl">
            "The journey of a thousand miles begins with a single step."
          </p>
          <p className="text-lg mt-2">- Lao Tzu</p>
        </div>

        {/* Auth Form */}
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-xl rounded-lg overflow-hidden">
          {/* Toggle Buttons */}
          <div className="flex">
            <button
              className={`flex-1 py-4 text-lg font-semibold ${
                isLogin
                  ? "bg-rose-500 bg-opacity-70 text-white"
                  : "bg-gray-100 bg-opacity-20 text-white"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-4 text-lg font-semibold ${
                !isLogin
                  ? "bg-rose-500 bg-opacity-70 text-white"
                  : "bg-gray-100 bg-opacity-20 text-white"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Signup
            </button>
          </div>

          <div className="p-8">
            {isLogin ? (
              // Login Form
              <div className="space-y-6">
                <div>
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-white bg-transparent leading-tight focus:outline-none focus:shadow-outline placeholder-gray-400"
                    id="email"
                    type="email"
                    placeholder="Email"
                    name="emailId"
                    value={loginData.emailId}
                    onChange={handleLoginChange}
                  />
                </div>
                <div>
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-white bg-transparent leading-tight focus:outline-none focus:shadow-outline placeholder-gray-400"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center px-4"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-gray-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-gray-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-rose-500 bg-opacity-70 hover:bg-opacity-100 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300"
                    type="button"
                    onClick={handleLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Sign In"}
                  </button>
                  <a
                    className="inline-block align-baseline font-bold text-sm text-rose-500 hover:text-rose-600"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
            ) : (
              // Signup Form
              <form onSubmit={handleSignup} className="space-y-6">
                <div>
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={signupData.firstName}
                    onChange={handleSignupChange}
                    className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-white bg-transparent leading-tight focus:outline-none focus:shadow-outline placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={signupData.lastName}
                    onChange={handleSignupChange}
                    className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-white bg-transparent leading-tight focus:outline-none focus:shadow-outline placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="signupEmail"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="signupEmail"
                    name="emailId"
                    value={signupData.emailId}
                    onChange={handleSignupChange}
                    className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-white bg-transparent leading-tight focus:outline-none focus:shadow-outline placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="signupPassword"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="signupPassword"
                    name="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    className="shadow appearance-none border border-gray-300 rounded w-full py-3 px-4 text-white bg-transparent leading-tight focus:outline-none focus:shadow-outline placeholder-gray-400"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-rose-500 bg-opacity-70 hover:bg-opacity-100 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
