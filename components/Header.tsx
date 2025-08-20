"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import {
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="text-neutral-text shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Logo className="h-8 w-8 mr-2" />
            <span className="font-bold text-xl">Weather</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            {["Home", "Weather", "About", "Contact"].map((label) => (
              <a
                key={label}
                href={label === "Home" ? "/home" : `/${label.toLowerCase()}`}
                className="text-neutral-text hover:text-brand-primary transition"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="hover:text-brand-primary transition">
              Login
            </a>
            <a
              href="#"
              className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-full transition"
            >
              Get Started
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setOpen(!open)}>
              {open ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-neutral-bg border-t border-black/20">
          <nav className="px-2 py-4 space-y-2">
            {["Home", "Weather", "About", "Contact"].map((label) => (
              <a
                key={label}
                href={label === "Home" ? "/home" : `/${label.toLowerCase()}`}
                className="block px-4 py-2 rounded hover:bg-neutral-text/10 transition"
              >
                {label}
              </a>
            ))}
            <a
              href="#"
              className="block px-4 py-2 rounded hover:bg-neutral-text/10 transition"
            >
              Login
            </a>
            <a
              href="#"
              className="block px-4 py-2 rounded bg-black hover:bg-gray-800 text-white transition"
            >
              Get Started
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
