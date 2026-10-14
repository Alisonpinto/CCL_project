import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Cpu,
  Sun,
  Moon,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';
import { LABS_DATA } from '../data/labsData';

export default function Navbar({ darkMode, setDarkMode }) {
  const [labsDropdownOpen, setLabsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileLabsOpen, setMobileLabsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLabsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white block leading-none">
                LabSim
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400">
                Electrical Labs
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {/* 1. Home */}
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive('/') && location.pathname === '/'
                  ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              Home
            </Link>

            {/* 2. Labs Dropdown for all 8 Labs */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setLabsDropdownOpen(true)}
              onMouseLeave={() => setLabsDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setLabsDropdownOpen((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive('/labs')
                    ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
                aria-expanded={labsDropdownOpen}
              >
                <span>Labs</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    labsDropdownOpen ? 'rotate-180 text-emerald-600' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {labsDropdownOpen && (
                <div className="absolute left-0 mt-1 w-80 lg:w-96 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      All 8 Laboratory Workbenches
                    </span>
                    <Link
                      to="/labs"
                      className="text-[10px] font-bold text-emerald-600 hover:underline"
                    >
                      View Directory
                    </Link>
                  </div>

                  <div className="max-h-96 overflow-y-auto py-1 space-y-0.5">
                    {LABS_DATA.map((lab) => {
                      const Icon = lab.icon;
                      const isCurrent = location.pathname === lab.path;
                      return (
                        <Link
                          key={lab.id}
                          to={lab.path}
                          className={`flex items-start gap-3 rounded-xl p-2.5 transition-all ${
                            isCurrent
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400 shrink-0 mt-0.5">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                {lab.badge}
                              </span>
                              <span className="text-xs font-bold truncate">
                                {lab.shortTitle}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              {lab.summary}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 rounded-xl mt-1">
                    <Link
                      to="/labs"
                      className="flex items-center justify-between text-xs font-bold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400 p-1"
                    >
                      <span>Explore All 8 Labs Directory</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. About Us */}
            <Link
              to="/about"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive('/about')
                  ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              About Us
            </Link>

            {/* 4. Lab Manual */}
            <Link
              to="/manual"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive('/manual') || isActive('/lab-manual')
                  ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              Lab Manual
            </Link>

            {/* 5. Contact Us */}
            <Link
              to="/contact"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive('/contact')
                  ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 transition-all cursor-pointer shadow-xs"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Quick Action Button */}
            <Link
              to="/labs"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition-all shadow-xs"
            >
              <span>Explore Labs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile hamburger & theme */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-2">
          {/* Home */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3.5 py-2.5 rounded-xl text-xs font-bold ${
              location.pathname === '/'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            Home
          </Link>

          {/* Labs Dropdown Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setMobileLabsOpen(!mobileLabsOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              <span>Labs (All 8 Workbenches)</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${mobileLabsOpen ? 'rotate-180 text-emerald-600' : ''}`}
              />
            </button>

            {mobileLabsOpen && (
              <div className="pl-4 pr-2 py-2 space-y-1 bg-slate-50 dark:bg-slate-900/50 rounded-xl my-1">
                {LABS_DATA.map((lab) => (
                  <Link
                    key={lab.id}
                    to={lab.path}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileLabsOpen(false);
                    }}
                    className="flex items-center justify-between py-2 px-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                  >
                    <span>{lab.badge}: {lab.shortTitle}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </Link>
                ))}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <Link
                    to="/labs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs font-bold text-emerald-600 py-1"
                  >
                    View All Labs Directory &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* About Us */}
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3.5 py-2.5 rounded-xl text-xs font-bold ${
              isActive('/about')
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            About Us
          </Link>

          {/* Lab Manual */}
          <Link
            to="/manual"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3.5 py-2.5 rounded-xl text-xs font-bold ${
              isActive('/manual')
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            Lab Manual
          </Link>

          {/* Contact Us */}
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3.5 py-2.5 rounded-xl text-xs font-bold ${
              isActive('/contact')
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            Contact Us
          </Link>

          <Link
            to="/labs"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full mt-3 py-3 rounded-xl text-xs font-bold text-white bg-emerald-600 shadow-sm"
          >
            <span>Launch All Labs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </nav>
  );
}
