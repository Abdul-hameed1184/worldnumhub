import React from "react";

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-center py-16 px-4">
      <p className="max-w-3xl mx-auto text-xl md:text-4xl font-bold leading-relaxed">
        "Buy Premium Quality OTP in Cheapest Price and stay safe from unwanted promotional sms and calls and also prevent your identity from fraudsters"
      </p>
      <div className="flex justify-center mt-6">
        <img src="/logo192.png" alt="logo" className="h-8" />
      </div>
    </section>
  );
};

export default Banner;
