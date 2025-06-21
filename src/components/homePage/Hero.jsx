import { LogIn, LogOut } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import TypingEffect from "../common/TypingEffect";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-[#f7f7f7] py-20 px-4 pt-45">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        {/* Left content */}
        <div className="w-full  text-center md:text-left ml-16">
          {/* <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
            <span className="text-orange-500">
              Your number one virtual number provider
            </span>
          </h1> */}
           <TypingEffect />
          <p className="text-gray-500 text-[1rem] max-w-md font-medium">
             Power Your Business with Global Virtual Phone Numbers
          </p>

         

          <div className="flex flex-row sm:justify-start justify-center gap-4 mt-6">
            <button
              className="bg-amber-600 hover:bg-amber-500 text-sm font-medium text-white px-6 py-2 rounded-full flex items-center transition-colors gap-3"
              onClick={() => navigate("/sign-in")}
            >
              <LogIn /> Login
            </button>
            <button
              className="bg-amber-600 hover:bg-amber-500 text-sm font-medium text-white px-6 py-2 rounded-full flex items-center transition-colors gap-3"
              onClick={() => navigate("/sign-up")}
            >
              <LogOut /> Signup
            </button>
          </div>
        </div>

        {/* Optional: Right illustration or image */}
        {/* <div className="w-full md:w-1/2">
          <img src="/your-hero-image.png" alt="Hero visual" className="w-full h-auto" />
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
