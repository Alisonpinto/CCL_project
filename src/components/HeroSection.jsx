import React, { useState } from 'react';
import {
  Zap,
  Sliders,
  Activity,
  ArrowRight,
  Power
} from 'lucide-react';

export default function HeroSection() {
  const [isPowered, setIsPowered] = useState(true);
  const [resistance, setResistance] = useState(330);
  const voltage = 5.0;
  
  // Real calculation
  const current = isPowered ? ((voltage / resistance) * 1000).toFixed(1) : '0.0';
  const power = isPowered ? ((voltage * (voltage / resistance)) * 1000).toFixed(1) : '0.0';

  return (
    <section className="pt-8 pb-16 md:pt-14 md:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Punchy Text & Actions */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Web-Based Electronics Lab</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Interactive Engineering{' '}
              <span className="text-emerald-600 dark:text-emerald-400">
                Lab Simulations.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Visualize circuits, run experiments, and access a complete toolbox of electrical engineering calculators—all in your browser.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#simulations"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 shadow-sm transition-all"
              >
                <Zap className="w-4 h-4" />
                <span>Start Simulating</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </a>

              <a
                href="#tools"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
              >
                <Sliders className="w-4 h-4" />
                <span>Explore Tools</span>
              </a>
            </div>
          </div>

          {/* Right: Tactile Visual Workbench */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
              
              {/* Workbench Top Bar */}
              <div className="px-4 py-3 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-2">circuit_preview.sim</span>
                </div>

                {/* Power Switch Visual */}
                <button
                  type="button"
                  onClick={() => setIsPowered(!isPowered)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                    isPowered
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>{isPowered ? 'CIRCUIT ACTIVE' : 'POWER OFF'}</span>
                </button>
              </div>

              {/* Visual Schematic Diagram */}
              <div className="p-5 bg-slate-950 text-white relative">
                {/* Circuit SVG Graphic */}
                <svg className="w-full h-36" viewBox="0 0 420 120" fill="none">
                  {/* DC Source */}
                  <circle cx="50" cy="60" r="20" stroke="#10b981" strokeWidth="2" fill="#022c22" />
                  <text x="50" y="64" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontFamily="monospace" fontWeight="bold">5.0V</text>
                  
                  {/* Wire to Switch */}
                  <line x1="70" y1="60" x2="130" y2="60" stroke={isPowered ? '#10b981' : '#475569'} strokeWidth="2" strokeDasharray={isPowered ? '4 2' : 'none'} />

                  {/* Switch Symbol */}
                  <circle cx="130" cy="60" r="3" fill="#10b981" />
                  <line x1="130" y1="60" x2={isPowered ? '170' : '165'} y2={isPowered ? '60' : '45'} stroke="#10b981" strokeWidth="2.5" />
                  <circle cx="170" cy="60" r="3" fill="#10b981" />

                  {/* Wire to Resistor */}
                  <line x1="170" y1="60" x2="220" y2="60" stroke={isPowered ? '#10b981' : '#475569'} strokeWidth="2" strokeDasharray={isPowered ? '4 2' : 'none'} />

                  {/* Resistor Visual */}
                  <g transform="translate(220, 48)">
                    <rect width="64" height="24" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                    <text x="32" y="16" textAnchor="middle" fill="#f8fafc" fontSize="11" fontFamily="monospace">{resistance}Ω</text>
                  </g>

                  {/* Wire to LED */}
                  <line x1="284" y1="60" x2="335" y2="60" stroke={isPowered ? '#10b981' : '#475569'} strokeWidth="2" strokeDasharray={isPowered ? '4 2' : 'none'} />

                  {/* LED / Diode Symbol */}
                  <g transform="translate(335, 45)">
                    <polygon points="0,0 0,30 20,15" fill={isPowered ? '#10b981' : '#334155'} stroke="#10b981" strokeWidth="1.5" />
                    <line x1="20" y1="0" x2="20" y2="30" stroke="#10b981" strokeWidth="2" />
                    {/* Glowing light indicator */}
                    {isPowered && (
                      <circle cx="10" cy="15" r="14" fill="#10b981" opacity="0.3" className="animate-ping" />
                    )}
                  </g>

                  {/* Return Loop Ground Wire */}
                  <path d="M 355 60 H 390 V 105 H 50 V 80" stroke={isPowered ? '#059669' : '#334155'} strokeWidth="2" strokeDasharray={isPowered ? '4 2' : 'none'} />
                  <line x1="220" y1="105" x2="220" y2="114" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="212" y1="114" x2="228" y2="114" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="216" y1="117" x2="224" y2="117" stroke="#94a3b8" strokeWidth="1" />
                </svg>

                {/* Live Oscilloscope Wave Line */}
                <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Activity className={`w-3.5 h-3.5 ${isPowered ? 'animate-pulse' : ''}`} />
                    <span>STATUS: {isPowered ? 'ACTIVE CIRCUIT' : 'OPEN CIRCUIT'}</span>
                  </div>
                  <span className="text-emerald-300">V = 5.00 V</span>
                </div>
              </div>

              {/* Visual Telemetry Meters */}
              <div className="grid grid-cols-3 divide-x divide-slate-200 dark:divide-slate-800 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="p-3.5 text-center">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Voltage</div>
                  <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                    {voltage.toFixed(1)} <span className="text-xs text-slate-400">V</span>
                  </div>
                </div>

                <div className="p-3.5 text-center bg-emerald-50/40 dark:bg-emerald-950/20">
                  <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">Current</div>
                  <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {current} <span className="text-xs">mA</span>
                  </div>
                </div>

                <div className="p-3.5 text-center">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Power</div>
                  <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                    {power} <span className="text-xs text-slate-400">mW</span>
                  </div>
                </div>
              </div>

              {/* Slider Visual Controller */}
              <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-200 dark:border-slate-800 flex items-center gap-4">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300 shrink-0">Adjust Load:</span>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="10"
                  value={resistance}
                  onChange={(e) => setResistance(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">{resistance} Ω</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
