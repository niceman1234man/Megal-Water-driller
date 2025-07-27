import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-700">Megal Water Drilling</Link>
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
           <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/services" className="hover:text-blue-600">Services</Link>
          <Link to="/projects" className="hover:text-blue-600">Projects</Link>
          <Link to="/gallery" className="hover:text-blue-600">Gallery</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="block py-2">Home</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="block py-2">Services</Link>
          <Link to="/projects" onClick={() => setIsOpen(false)} className="block py-2">Projects</Link>
          <Link to="/gallery" onClick={() => setIsOpen(false)} className="block py-2">Gallery</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-2">Contact</Link>
        </div>
      )}
    </nav>
  );
}