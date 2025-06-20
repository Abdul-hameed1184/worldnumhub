import React from "react";

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-amber-800 to-amber-600 text-white text-center py-16 px-4">
      <p className="max-w-3xl mx-auto text-xl md:text-4xl font-bold leading-relaxed">
        WorldNumHub helps individuals and businesses get virtual numbers from multiple countries in seconds. Get verified, stay connected, and expand globally — all in one hub.
      </p>
      <div className="flex justify-center mt-6">
        <img src="/logo.png" alt="logo" className="h-8" />
      </div>
    </section>
  );
};

export default Banner;
