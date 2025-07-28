import React from "react";

const Support = () => {
  return (
    <section className="bg-[#F8F9FA] py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            We provide 24/7 Customer Support
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Our highly trained customer support executives are always ready to solve your every problem and answer all your queries. Feel free to contact us anytime.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <img
            src="support.png"
            alt="Customer support"
            className="rounded-full w-48 h-48 md:w-150 md:h-150 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Support;
