import { LogIn, LogOut } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-center py-20 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6">
        <p className="font-bold text-2xl md:text-3xl">
          Start Using Our Service
        </p>

        <div className="flex flex-col sm:flex-row gap-2 ">
          <button
            className="bg-black text-white px-6 py-2 flex gap-2 justify-center items-center text-sm md:text-base rounded-full hover:opacity-90 transition"
            onClick={() => navigate("/sign-in")}
          >
            <LogIn size={20} /> Login
          </button>

          <button
            className="bg-black text-white px-6 py-2 flex gap-2 justify-center items-center text-sm md:text-base rounded-full hover:opacity-90 transition"
            onClick={() => navigate("/sign-up")}
          >
            <LogOut size={20} /> Sign Up
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
