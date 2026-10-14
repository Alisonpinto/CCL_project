import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  RotateCcw,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Zap,
} from 'lucide-react';
import { calculateElectricalPower } from '../../lib/calculations/power';

const POWER_PRESETS = [
  { label: '3-Phase 400V Industrial Motor (15A, PF 0.85, 90% eff)', systemType: 'three', voltageV: 400, currentA: 15, powerFactor: 0.85, efficiency: 0.9 },
  { label: '1-Phase 230V Domestic Load (10A, PF 0.95)', systemType: 'single', voltageV: 230, currentA: 10, powerFactor: 0.95, efficiency: 1.0 },
  { label: '1-Phase HVAC Compressor (230V, 12A, PF 0.78, 88% eff)', systemType: 'single', voltageV: 230, currentA: 12, powerFactor: 0.78, efficiency: 0.88 },
  { label: '48V DC Telecom Power Plant (50A, 94% eff)', systemType: 'dc', voltageV: 48, currentA: 50, powerFactor: 1.0, efficiency: 0.94 },
];

const formatNum = (v, digits = 2) => {
  if (!Number.isFinite(v)) return '—';
  if (Math.abs(v) >= 1000) return v.toLocaleString(undefined, { maximumFractionDigits: digits });
  return Number(v).toLocaleString(undefined, { maximumFractionDigits: digits });
};

export default function PowerLab() {
  const [systemType, setSystemType] = useState('single');
  const [voltageV, setVoltageV] = useState(230);
  const [currentA, setCurrentA] = useState(10);
  const [powerFactor, setPowerFactor] = useState(0.85);
  const [efficiency, setEfficiency] = useState(0.9);
  const [copied, setCopied] = useState(false);

  const result = calculateElectricalPower({
    systemType,
    voltageV: Number(voltageV),
    currentA: Number(currentA),
    powerFactor: Number(powerFactor),
    efficiency: Number(efficiency),
  });

  const handleCopy = () => {
    if (!result.ok) return;
    const text = `${systemType.toUpperCase()} Power: P = ${formatNum(result.realPowerW)} W, S = ${formatNum(result.apparentPowerVA)} VA, Q = ${formatNum(result.reactivePowerVar)} var (PF ${powerFactor}, Eff ${efficiency})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSystemType('single');
    setVoltageV(230);
    setCurrentA(10);
    setPowerFactor(0.85);
    setEfficiency(0.9);
  };

  return (
    <div className="space-y-10">
      {/* Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">Home</Link>
          <span>/</span>
          <Link to="/labs" className="hover:text-emerald-600 dark:hover:text-emerald-400">Labs</Link>
          <span>/</span>
          <span className="font-semibold text-slate-900 dark:text-white">Lab 05: AC & DC Power</span>
        </nav>
        <Link
          to="/manual"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>View in Lab Manual</span>
        </Link>
      </div>

      {/* Lab Header */}
      <div className="rounded-3xl border border-slate-200 bg-linear-to-r from-purple-500/10 via-pink-500/5 to-transparent p-6 sm:p-8 dark:border-slate-800 dark:from-purple-950/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-700 dark:border-purple-800 dark:bg-purple-950/80 dark:text-purple-300">
              <Cpu className="w-3.5 h-3.5" />
              <span>Lab 05 &bull; Power Systems & Energy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Single & Three-Phase Power Calculator
            </h1>
            <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Calculate Active Power (W), Apparent Power (VA), and Reactive Power (var) along with power factor derating and equipment conversion efficiency.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:border-purple-400 hover:text-purple-600 shadow-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!result.ok}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-purple-500 disabled:opacity-50"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Result'}
            </button>
          </div>
        </div>
      </div>

      {/* Preset Quick Selection */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-3">
          Standard Real-World Industrial & Domestic Presets
        </span>
        <div className="flex flex-wrap gap-2">
          {POWER_PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setSystemType(p.systemType);
                setVoltageV(p.voltageV);
                setCurrentA(p.currentA);
                setPowerFactor(p.powerFactor);
                setEfficiency(p.efficiency);
              }}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-purple-500 hover:text-purple-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:text-purple-400 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Workbench */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left: Input Parameters (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">System Parameters</h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                Grid Configuration
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'single', label: '1-Phase AC' },
                  { id: 'three', label: '3-Phase AC' },
                  { id: 'dc', label: 'DC Supply' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSystemType(s.id)}
                    className={`rounded-xl py-2.5 text-xs font-bold transition-all border ${
                      systemType === s.id
                        ? 'border-purple-600 bg-purple-600 text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                  Voltage (V)
                </label>
                <input
                  type="number"
                  value={voltageV}
                  onChange={(e) => setVoltageV(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
                <span className="text-[10px] text-slate-400">
                  {systemType === 'three' ? 'Line-to-line RMS' : 'RMS voltage'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                  Current (A)
                </label>
                <input
                  type="number"
                  value={currentA}
                  onChange={(e) => setCurrentA(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
                <span className="text-[10px] text-slate-400">
                  {systemType === 'three' ? 'Line current' : 'Load current'}
                </span>
              </div>

              {systemType !== 'dc' && (
                <div>
                  <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                    Power Factor (cos &phi;)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={powerFactor}
                    onChange={(e) => setPowerFactor(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                  <span className="text-[10px] text-slate-400">0.00 (reactive) to 1.00 (resistive)</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                  Efficiency (&eta;)
                </label>
                <input
                  type="number"
                  min="0.01"
                  max="1"
                  step="0.01"
                  value={efficiency}
                  onChange={(e) => setEfficiency(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
                <span className="text-[10px] text-slate-400">0.01 to 1.00 (e.g. 0.90 = 90%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Telemetry (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Power Analysis</h3>

            {!result.ok ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
                {result.error}
              </div>
            ) : (
              <div className="space-y-4">
                {/* 4 Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-purple-500/30 bg-purple-50/40 p-4 dark:border-purple-500/20 dark:bg-purple-950/20">
                    <span className="text-[10px] uppercase font-bold text-purple-700 dark:text-purple-400 tracking-wider block mb-1">
                      Real Active Power (P)
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {formatNum(result.realPowerW)} <span className="text-sm font-normal text-slate-500">W</span>
                    </div>
                    <span className="text-[11px] text-purple-600 dark:text-purple-400 font-mono">
                      ({formatNum(result.realPowerW / 1000, 3)} kW)
                    </span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                      Apparent Power (S)
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {formatNum(result.apparentPowerVA)} <span className="text-sm font-normal text-slate-500">VA</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      ({formatNum(result.apparentPowerVA / 1000, 3)} kVA)
                    </span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                      Reactive Power (Q)
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {formatNum(result.reactivePowerVar)} <span className="text-sm font-normal text-slate-500">var</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      ({formatNum(result.reactivePowerVar / 1000, 3)} kvar)
                    </span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                      Mechanical Output
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {formatNum(result.outputPowerW || 0)} <span className="text-sm font-normal text-slate-500">W</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      ({formatNum((result.outputPowerW || 0) / 745.7, 2)} hp)
                    </span>
                  </div>
                </div>

                {/* Calculation Summary */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                    Mathematical Formulation
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-mono leading-relaxed">
                    {result.summary}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Theory Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <Zap className="w-4 h-4 text-purple-500" />
              <span>Three-Phase vs Single-Phase Relations</span>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 leading-relaxed font-mono">
              <li>&bull; 1-Phase: P = V &times; I &times; cos(&phi;)</li>
              <li>&bull; 3-Phase: P = &radic;3 &times; V<sub>LL</sub> &times; I<sub>L</sub> &times; cos(&phi;)</li>
              <li>&bull; Apparent Power: S = &radic;(P&sup2; + Q&sup2;)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
        <Link
          to="/labs/wire-cable"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous: Lab 04 &bull; Wire & Cable</span>
        </Link>
        <Link
          to="/labs/unit-converter"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors"
        >
          <span>Next: Lab 06 &bull; Unit Converter</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
