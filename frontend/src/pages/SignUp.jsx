import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    passwordMismatch: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Live check for password mismatch
    if (
      (name === "password" || name === "confirmPassword") &&
      formData.confirmPassword
    ) {
      setErrors((prev) => ({
        ...prev,
        passwordMismatch:
          name === "confirmPassword"
            ? value !== formData.password
            : formData.confirmPassword !== value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrors({ passwordMismatch: true });
      return;
    }
    const payload = {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,

    }


    console.log("Submitted Data:", payload);
    // Add real API call here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-1">Sign Up</h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter your details to sign up
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">
              Username
            </label>
            <input
              type="text"
              name="userName"
              placeholder="Enter Username"
              value={formData.userName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border ${
                errors.passwordMismatch ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-none`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border ${
                errors.passwordMismatch ? "border-red-500" : "border-gray-300"
              } rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-none`}
              required
            />
            {errors.passwordMismatch && (
              <p className="text-red-500 text-xs mt-1">
                Passwords do not match.
              </p>
            )}
          </div>
          <div className="mx-15">
            <button
              type="submit"
              className="w-full border-[#E3A549] border text-orange-400 py-2 rounded-md text-sm hover:bg-[#E3A549] hover:text-white transition-colors font-bold"
            >
              SIGN UP
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center my-6">
          <div className="border-t w-full border-gray-200"></div>
          <span className="px-2 text-xs text-gray-500 font-semibold">OR</span>
          <div className="border-t w-full border-gray-200"></div>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>
            Already have an account?{" "}
            <Link to={'/sign-in'} className="text-orange-400 font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
