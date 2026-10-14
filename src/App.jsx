import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import LabsHub from './pages/LabsHub';
import AboutPage from './pages/AboutPage';
import LabManualPage from './pages/LabManualPage';
import ContactPage from './pages/ContactPage';

// 8 Dedicated Lab Pages
import ResistorLab from './pages/labs/ResistorLab';
import SmdLab from './pages/labs/SmdLab';
import OhmsLawLab from './pages/labs/OhmsLawLab';
import WireCableLab from './pages/labs/WireCableLab';
import PowerLab from './pages/labs/PowerLab';
import UnitConverterLab from './pages/labs/UnitConverterLab';
import SolarBatteryLab from './pages/labs/SolarBatteryLab';
import SafetyLab from './pages/labs/SafetyLab';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('labsim-theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('labsim-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-200">
      <ScrollToTop />
      {/* Background Subtle Grid Texture */}
      <div className="fixed inset-0 pointer-events-none circuit-grid-light dark:circuit-grid-dark opacity-35 z-0" />

      {/* Navigation Header */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Dynamic Viewport */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Routes>
          {/* Index Page (does not inline all 8 labs; links to each separate lab page) */}
          <Route path="/" element={<HomePage />} />

          {/* Directory of all 8 Labs */}
          <Route path="/labs" element={<LabsHub />} />

          {/* 8 Dedicated Lab Simulation Pages */}
          <Route path="/labs/resistor" element={<ResistorLab />} />
          <Route path="/labs/smd" element={<SmdLab />} />
          <Route path="/labs/ohms-law" element={<OhmsLawLab />} />
          <Route path="/labs/wire-cable" element={<WireCableLab />} />
          <Route path="/labs/power" element={<PowerLab />} />
          <Route path="/labs/unit-converter" element={<UnitConverterLab />} />
          <Route path="/labs/solar-battery" element={<SolarBatteryLab />} />
          <Route path="/labs/safety" element={<SafetyLab />} />

          {/* Primary Navigation Destinations */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/manual" element={<LabManualPage />} />
          <Route path="/lab-manual" element={<LabManualPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact-us" element={<ContactPage />} />

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
