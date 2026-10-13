import React, { useState } from 'react';
import { Cpu, Sun, Moon, ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Simulations', href: '#simulations' },
    { name: 'Engineering Tools', href: '#tools' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-xs">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              LabSim
            </span>
          </a>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <a
              href="#launch"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition-all shadow-xs"
            >
              <span>Launch App</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#launch"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full mt-2 py-2.5 rounded-lg text-sm font-semibold text-white bg-emerald-600"
          >
            <span>Launch App</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </nav>
  );
}
