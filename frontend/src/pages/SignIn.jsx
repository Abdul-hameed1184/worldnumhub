import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, loading, error, user } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) {
      navigate("/dashboard");
    }
  };

  // Redirect if already logged in
  if (user) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-4 ">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-1">Sign In</h2>
        <p className="text-sm text-gray-600 mb-6">
          Enter your email and password to login
        </p>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <form className="space-y-5" onSubmit={handleSubmit}>
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
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-none"
              required
            />
          </div>
          <div className="mx-15">
            <button
              type="submit"
              className={`w-full border-[#E3A549] border-1 text-orange-400  py-2 rounded-md text-sm  hover:bg-[#E3A549] hover:text-white transition-color font-bold`}
              disabled={loading}
            >
              {loading ? "Signing In..." : "SIGN IN"}
            </button>
          </div>
        </form>
        {/* ...existing code... */}
        <div className="flex items-center justify-center my-6">
          <div className="border-t w-full border-gray-200"></div>
          <span className="px-2 text-xs text-gray-500 font-semibold">OR</span>
          <div className="border-t w-full border-gray-200"></div>
        </div>
        <div className="text-center text-sm text-gray-600">
          <p>
            Forgot password?{" "}
            <Link to={'/reset-password'} className="text-orange-400 font-medium hover:underline">
              Recover
            </Link>
          </p>
          <p className="mt-1">
            Don’t have an account ?{" "}
            <Link to="/sign-up" className="text-orange-400 font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
