import {
  ShoppingBag,
  ClipboardCheck,
  Smartphone,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: <ShoppingBag size={28} className="text-purple-600" />,
    title: "Select Services",
    description: "Select the service for which you need a number.",
  },
  {
    icon: <ClipboardCheck size={28} className="text-purple-600" />,
    title: "Place Your Order",
    description: "We’ll instantly assign you a number for signup.",
  },
  {
    icon: <Smartphone size={28} className="text-purple-600" />,
    title: "Get the OTP",
    description: "Receive the OTP to complete your verification process.",
  },
  {
    icon: <Wallet size={28} className="text-purple-600" />,
    title: "Easy to Recharge",
    description: "We support easy crypto payments for fast recharge.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-10">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center px-2"
          >
            <div className="mb-3">{feature.icon}</div>
            <h3 className="text-base font-semibold text-gray-800 mb-1">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-500 max-w-[220px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
