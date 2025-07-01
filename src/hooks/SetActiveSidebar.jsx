import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageCircle,
  Wallet,
  Lock,
  FileText,
  Clock,
  PhoneCall,
  Zap,
} from "lucide-react";

  const sidebarLinks = [
  {
    section: "",
    links: [
      {
        name: "Dashboard",
        icon: <LayoutDashboard size={18} />,
        active: false,
        link: "/dashboard",
      },
    ],
  },
  {
    section: "SERVICES",
    links: [
      {
        name: "Buy USA Numbers",
        icon: <MessageCircle size={18} />,
        active: false,
        link: "/usa-numbers",
      },
      {
        name: "Buy all countries Numbers",
        icon: <MessageCircle size={18} />,
        active: false,
        link: "/numbers",
      },

      {
        name: "Fund Wallet",
        icon: <Wallet size={18} />,
        link: "/recharge",
        active: false,
      },
      {
        name: "Buy Social Media Account",
        icon: <PhoneCall size={18} />,
        active: false,
        link: "https://cloutsy.vercel.app/",
      },
    ],
  },
  {
    section: "HISTORY",
    links: [
      {
        name: "Numbers History",
        icon: <Clock size={18} />,
        active: false,
        link: "/numbers-history",
      },
      {
        name: "Transaction History",
        icon: <FileText size={18} />,
        active: false,
        link: "/transactions",
      },
    ],
  },
  //   {
  //     section: "DEVELOPER TOOL",
  //     links: [
  //       { name: "Api Tools", icon: <Lock size={18} />, active: true },
  //     ],
  //   },
  //   {
  //     section: "SUPPORTS",
  //     links: [
  //       { name: "Contact Us", icon: <PhoneCall size={18} /> },
  //       { name: "Join Channel", icon: <Zap size={18} /> },
  //     ],
  //   },
];

export const useActiveSidebarLinks = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const updatedSidebarLinks = sidebarLinks.map(section => ({
    ...section,
    links: section.links.map(link => ({
      ...link,
      active: currentPath.includes(link.link),
    })),
  }));

  return updatedSidebarLinks;
};
