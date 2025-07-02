import {
  ShoppingBag,
  ClipboardCheck,
  Smartphone,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: <ShoppingBag size={28} className="text-amber-600" />,
    title: "Search Numbers",
    description: "Choose country, type (mobile, landline, toll-free).",
  },
  {
    icon: <ClipboardCheck size={28} className="text-amber-600" />,
    title: "Make Payment",
    description: "Secure checkout with preferred payment gateway.",
  },
  {
    icon: <Smartphone size={28} className="text-amber-600" />,
    title: "Get Your Number",
    description: "Instantly activated and ready for use.",
  },
  {
    icon: <Wallet size={28} className="text-amber-600" />,
    title: "Manage Dashboard",
    description: "View, renew, or integrate with third-party tools.",
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
