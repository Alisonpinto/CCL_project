import React from 'react';
import {
  CircuitBoard,
  Calculator,
  BookOpen,
  ArrowRight,
  Zap,
  Activity,
  Check
} from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Core Modules</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything you need to prototype and calculate.
          </h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Interactive Circuits */}
          <div className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/70 dark:hover:border-emerald-500/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-center mb-5">
                <CircuitBoard className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Interactive Circuits
              </h3>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
                Drag, drop, and simulate electrical components in real-time.
              </p>
            </div>

            {/* Visual: Mini Circuit Canvas */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
                <span>RC TRANSIENT</span>
                <span>τ = 10ms</span>
              </div>
              <svg className="w-full h-18" viewBox="0 0 200 60" fill="none">
                <path d="M 10 30 H 60" stroke="#10b981" strokeWidth="2" strokeDasharray="3 2" />
                <rect x="60" y="20" width="30" height="20" rx="3" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <path d="M 90 30 H 130" stroke="#10b981" strokeWidth="2" strokeDasharray="3 2" />
                <line x1="130" y1="18" x2="130" y2="42" stroke="#6ee7b7" strokeWidth="2" />
                <line x1="138" y1="18" x2="138" y2="42" stroke="#6ee7b7" strokeWidth="2" />
                <path d="M 138 30 H 190" stroke="#10b981" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Card 2: Pro Toolkit */}
          <div className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/70 dark:hover:border-emerald-500/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-center mb-5">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Pro Toolkit
              </h3>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
                Resistor codes, wire gauges, solar backups, and more.
              </p>
            </div>

            {/* Visual: Resistor Color Band Visual */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">4-Band Decoder</span>
                <span className="text-emerald-400 font-bold">10 kΩ ±5%</span>
              </div>
              <div className="relative h-6 w-full rounded-md bg-amber-100 flex items-center overflow-hidden border border-slate-700">
                <div className="w-1/4 h-full bg-amber-900" title="Brown: 1" />
                <div className="w-1/4 h-full bg-slate-900" title="Black: 0" />
                <div className="w-1/4 h-full bg-orange-500" title="Orange: 1k" />
                <div className="w-1/4 h-full bg-yellow-400" title="Gold: 5%" />
              </div>
            </div>
          </div>

          {/* Card 3: Learn by Doing */}
          <div className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/70 dark:hover:border-emerald-500/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-center mb-5">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Learn by Doing
              </h3>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
                Visualize complex engineering concepts instantly.
              </p>
            </div>

            {/* Visual: Logic Gate & Waveform Visual */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>NAND LOGIC</span>
                <span className="text-emerald-400 font-bold">OUT = 1</span>
              </div>
              <div className="flex items-center justify-between gap-1 h-6">
                <div className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-emerald-400">A: 1</div>
                <span className="text-slate-500 font-mono text-xs">+</span>
                <div className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-emerald-400">B: 0</div>
                <span className="text-slate-500 font-mono text-xs">➔</span>
                <div className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[11px] font-bold border border-emerald-500/40">Q: 1</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
