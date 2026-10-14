import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  ArrowRight,
  Power,
  ShieldAlert,
  BookOpen,
  Activity,
  Sliders,
} from 'lucide-react';
import { LABS_DATA } from '../data/labsData';
import FeaturesSection from '../components/FeaturesSection';

export default function HomePage() {
  const [isPowered, setIsPowered] = useState(true);
  const [resistance, setResistance] = useState(330);
  const voltage = 5.0;

  // Real-time calculation for tactile hero visual circuit
  const current = isPowered ? ((voltage / resistance) * 1000).toFixed(1) : '0.0';
  const power = isPowered ? (voltage * (voltage / resistance) * 1000).toFixed(1) : '0.0';

  return (
    <div className="space-y-16">
      {/* 1. Hero Section with Tactile Interactive Circuit Workbench */}
      <section className="pt-2 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Headline & CTA */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Virtual Electrical Laboratory Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Interactive Engineering{' '}
              <span className="text-emerald-600 dark:text-emerald-400">
                Lab Simulations.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Experience all 8 electrical engineering laboratories across dedicated standalone workbenches. Calculate resistor bands, wire sizes, AC power, and solar setups with live telemetry.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                to="/labs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all"
              >
                <Zap className="w-4 h-4" />
                <span>Explore All 8 Labs</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>

              <Link
                to="/manual"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Lab Manual</span>
              </Link>
            </div>
          </div>

          {/* Right: Tactile Visual Workbench */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
              {/* Workbench Top Bar */}
              <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-2">
                    circuit_telemetry.sim
                  </span>
                </div>

                {/* Power Switch Toggle */}
                <button
                  type="button"
                  onClick={() => setIsPowered(!isPowered)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                    isPowered
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>{isPowered ? 'CIRCUIT ENERGIZED' : 'POWER OFF'}</span>
                </button>
              </div>

              {/* Schematic Viewport */}
              <div className="p-6 bg-slate-950 text-white relative">
                <div className="w-full overflow-x-auto pb-2">
                  <svg className="w-full min-w-[320px] h-28 sm:h-36" viewBox="0 0 420 120" fill="none">
                    {/* DC Voltage Source */}
                    <circle cx="50" cy="60" r="22" stroke={isPowered ? '#10b981' : '#475569'} strokeWidth="2" fill="#022c22" />
                    <text x="50" y="65" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontFamily="monospace" fontWeight="bold">5.0V</text>

                    {/* Wire to Switch */}
                    <line x1="72" y1="60" x2="140" y2="60" stroke={isPowered ? '#10b981' : '#475569'} strokeWidth="2.5" strokeDasharray={isPowered ? '4 2' : 'none'} />

                    {/* Knife Switch */}
                    <circle cx="140" cy="60" r="4" fill={isPowered ? '#10b981' : '#64748b'} />
                    <line x1="140" y1="60" x2="175" y2={isPowered ? '60' : '40'} stroke={isPowered ? '#10b981' : '#ef4444'} strokeWidth="3" />
                    <circle cx="180" cy="60" r="4" fill={isPowered ? '#10b981' : '#64748b'} />

                    {/* Wire to Resistor */}
                    <line x1="184" y1="60" x2="240" y2="60" stroke={isPowered ? '#10b981' : '#475569'} strokeWidth="2.5" strokeDasharray={isPowered ? '4 2' : 'none'} />

                    {/* Resistor Component Zigzag */}
                    <rect x="240" y="48" width="60" height="24" rx="4" fill="#1e293b" stroke={isPowered ? '#10b981' : '#475569'} strokeWidth="2" />
                    <text x="270" y="64" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      {resistance}&Omega;
                    </text>

                    {/* Wire to Ground/Return */}
                    <line x1="300" y1="60" x2="370" y2="60" stroke={isPowered ? '#10b981' : '#475569'} strokeWidth="2.5" strokeDasharray={isPowered ? '4 2' : 'none'} />
                    <line x1="370" y1="60" x2="370" y2="100" stroke={isPowered ? '#10b981' : '#475569'} strokeWidth="2.5" strokeDasharray={isPowered ? '4 2' : 'none'} />
                    <line x1="370" y1="100" x2="50" y2="100" stroke={isPowered ? '#10b981' : '#475569'} strokeWidth="2.5" strokeDasharray={isPowered ? '4 2' : 'none'} />
                    <line x1="50" y1="100" x2="50" y2="82" stroke={isPowered ? '#10b981' : '#475569'} strokeWidth="2.5" strokeDasharray={isPowered ? '4 2' : 'none'} />
                  </svg>
                </div>

                {/* Circuit Telemetry Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-3 border-t border-slate-800">
                  <div className="rounded-xl bg-slate-900 p-2.5 sm:p-3 flex sm:flex-col justify-between items-center sm:items-start">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Supply</span>
                    <span className="font-mono text-sm sm:text-base font-bold text-emerald-400">5.00 V</span>
                  </div>
                  <div className="rounded-xl bg-slate-900 p-2.5 sm:p-3 flex sm:flex-col justify-between items-center sm:items-start">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Current Flow</span>
                    <span className="font-mono text-sm sm:text-base font-bold text-emerald-400">{current} mA</span>
                  </div>
                  <div className="rounded-xl bg-slate-900 p-2.5 sm:p-3 flex sm:flex-col justify-between items-center sm:items-start">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Dissipation</span>
                    <span className="font-mono text-sm sm:text-base font-bold text-emerald-400">{power} mW</span>
                  </div>
                </div>
              </div>

              {/* Slider for Resistance */}
              <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4">
                <div className="flex items-center justify-between sm:justify-start gap-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-emerald-500" />
                    Load Resistance:
                  </span>
                  <span className="sm:hidden font-mono text-xs font-bold text-slate-900 dark:text-white">
                    {resistance} &Omega;
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="10"
                  value={resistance}
                  onChange={(e) => setResistance(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <span className="hidden sm:inline font-mono text-xs font-bold text-slate-900 dark:text-white shrink-0">
                  {resistance} &Omega;
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Stats Strip */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">8</div>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">Dedicated Laboratories</div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">100%</div>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">Client-Side Simulation</div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">0ms</div>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">Real-Time Computation</div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">IEEE / EIA</div>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">Standards Compliant</div>
          </div>
        </div>
      </section>

      {/* 3. The 8 Dedicated Laboratories Catalog */}
      <section id="labs" className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Activity className="w-3.5 h-3.5" />
              <span>Full Curriculum</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
              8 Dedicated Laboratory Workbenches
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Each lab features an isolated page environment with parameters, presets, and formula transparency.
            </p>
          </div>

          <Link
            to="/labs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
          >
            <span>View All in Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LABS_DATA.map((lab) => {
            const Icon = lab.icon;
            return (
              <div
                key={lab.id}
                className="group relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-200 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {lab.badge}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {lab.category}
                    </span>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {lab.shortTitle}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {lab.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    to={lab.path}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-emerald-600 dark:bg-white dark:text-slate-900 dark:hover:bg-emerald-500 dark:hover:text-white transition-colors"
                  >
                    <span>Launch {lab.badge}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Core Features Showcase */}
      <FeaturesSection />

      {/* 5. Lab Manual & Safety Spotlight */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Lab Manual Spotlight */}
        <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-emerald-500/10 to-teal-500/5 p-8 dark:border-slate-800 dark:from-emerald-950/30 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Official 8-Experiment Lab Manual
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Complete student curriculum containing theoretical principles, step-by-step procedures, formula derivation, and viva-voce questions and answers.
            </p>
          </div>

          <Link
            to="/manual"
            className="inline-flex items-center gap-2 self-start rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-500 transition-colors"
          >
            <span>Open Lab Manual</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Electrical Safety Spotlight */}
        <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-rose-500/10 to-red-500/5 p-8 dark:border-slate-800 dark:from-rose-950/30 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Electrical Safety & Risk Protocols
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Master mandatory laboratory Do’s and Don’ts, Lockout/Tagout isolation steps, wet environment precautions, and immediate first aid shock response.
            </p>
          </div>

          <Link
            to="/labs/safety"
            className="inline-flex items-center gap-2 self-start rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-rose-500 transition-colors"
          >
            <span>Read Safety Guide (Lab 08)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
