import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';

export default function App() {
  // Theme state: defaults to false (white/light mode), remembers user's choice in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('labsim-theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return false; // White / Light mode as default
    }
    return false;
  });

  // Effect to update DOM root class and persist to localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('labsim-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('labsim-theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-500/20 selection:text-emerald-700 dark:selection:bg-emerald-500/30 dark:selection:text-emerald-400 transition-colors duration-200 flex flex-col font-sans">
      
      {/* Background Engineering Grid */}
      <div className="fixed inset-0 pointer-events-none circuit-grid-light dark:circuit-grid-dark opacity-40 z-0" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* 1. Navbar */}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* 2. Hero & 3. Features */}
        <main className="flex-1">
          <HeroSection />
          <FeaturesSection />
        </main>

        {/* 4. Footer */}
        <Footer />
      </div>
    </div>
  );
}
