    import { Menu, X } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
    
    const Navbar = () => {
     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow px-4 py-3 md:px-27 md:py-10 fixed w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo192.png" alt="Logo" className="h-10" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to={'/sign-in'} className="text-sm text-gray-800 font-medium">Login</Link>
          <Link to={'/sign-up'} className="text-sm text-gray-800 font-medium">Signup</Link>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-sm font-medium text-white px-4 py-2 rounded-full flex items-center gap-1 transition-colors">
            📞 Contact Us
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-60 opacity-100 py-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4 bg-white">
          <Link to={'/sign-up'} className="text-sm text-gray-800 font-medium">Login</Link>
          <Link to={'/sign-in'} className="text-sm text-gray-800 font-medium">Signup</Link>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-sm font-medium text-white px-4 py-2 rounded-full flex items-center gap-1 transition-colors">
            📞 Contact Us
          </button>
        </div>
      </div>
    </header>
  );
      
    }
    
    export default Navbar
    