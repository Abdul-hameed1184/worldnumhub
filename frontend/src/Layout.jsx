import React, { useState } from "react";
import { Moon, Sun, Menu, LogOut } from "lucide-react";
import Sidebar from "./components/common/SideBar";
import { Outlet } from "react-router-dom";
import useThemeStore from "./store/useThemeStore";
import useAuthStore from "./store/useAuthStore";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { darkMode, toggleTheme } = useThemeStore();
  const {logout} = useAuthStore();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };



  return (
    <div className={darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-black"}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={isOpen} darkMode={darkMode} toggleSidebar={toggleSidebar} />
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Topbar */}
          <header
            className={`flex items-center justify-between px-4 py-2 shadow-sm ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            {!isOpen ? (
              <div className="flex items-center gap-2">
                <button onClick={toggleSidebar}>
                  <Menu />
                </button>
                <img src="/logo.png" alt="" className="h-5 w-auto" />
              </div>
            ) : (
              <div></div>
            )}
            <div className="flex gap-5">


            <button
              onClick={toggleTheme}
              className="p-2 rounded-md transition-all items-end"
            >
              {darkMode ? <Sun /> : <Moon />}
            </button>
            <button onClick={()=> logout()} className="p-2 rounded-md transition-all">
              <LogOut/>
            </button>
              </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
