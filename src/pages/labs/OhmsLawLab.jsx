import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  RotateCcw,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Info,
  Activity,
} from 'lucide-react';
import { calculateOhmsLaw } from '../../lib/calculations/ohmsLaw';

const OHM_PRESETS = [
  { label: '5V USB 2.0 (500mA max)', mode: 'voltage-current', values: { voltageV: 5, currentA: 0.5, resistanceOhms: 10, powerW: 2.5 } },
  { label: '12V Automotive (2A Accessory)', mode: 'voltage-current', values: { voltageV: 12, currentA: 2, resistanceOhms: 6, powerW: 24 } },
  { label: '230V Domestic Heater (10A)', mode: 'voltage-current', values: { voltageV: 230, currentA: 10, resistanceOhms: 23, powerW: 2300 } },
  { label: '3.3V Microcontroller LED (20mA)', mode: 'voltage-current', values: { voltageV: 3.3, currentA: 0.02, resistanceOhms: 165, powerW: 0.066 } },
  { label: '100W Incandescent Bulb at 120V', mode: 'voltage-power', values: { voltageV: 120, currentA: 0.833, resistanceOhms: 144, powerW: 100 } },
];

const formatNum = (v, digits = 3) => {
  if (!Number.isFinite(v)) return '—';
  if (Math.abs(v) >= 1000) return v.toLocaleString(undefined, { maximumFractionDigits: digits });
  return Number(v).toLocaleString(undefined, { maximumFractionDigits: digits });
};

export default function OhmsLawLab() {
  const [mode, setMode] = useState('voltage-current');
  const [values, setValues] = useState({
    voltageV: 12,
    currentA: 2,
    resistanceOhms: 6,
    powerW: 24,
  });
  const [copied, setCopied] = useState(false);

  const result = calculateOhmsLaw({ mode, ...values });

  const updateValue = (key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleCopy = () => {
    if (!result.ok) return;
    const text = `Ohm's Law: Voltage = ${formatNum(result.voltageV)} V, Current = ${formatNum(result.currentA)} A, Resistance = ${formatNum(result.resistanceOhms)} Ω, Power = ${formatNum(result.powerW)} W`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setMode('voltage-current');
    setValues({ voltageV: 12, currentA: 2, resistanceOhms: 6, powerW: 24 });
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
          <span className="font-semibold text-slate-900 dark:text-white">Lab 03: Ohm’s Law & Power</span>
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
      <div className="rounded-3xl border border-slate-200 bg-linear-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-6 sm:p-8 dark:border-slate-800 dark:from-emerald-950/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
              <Zap className="w-3.5 h-3.5" />
              <span>Lab 03 &bull; Fundamental Circuit Laws</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Ohm’s Law Electrical Calculator
            </h1>
            <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Solve for Voltage (V), Current (I), Resistance (R), and Power (P) across DC and purely resistive AC circuits. Select any 2 known values to compute the rest.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-600 shadow-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!result.ok}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-500 disabled:opacity-50"
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
          Standard Real-World Circuit Presets
        </span>
        <div className="flex flex-wrap gap-2">
          {OHM_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                setMode(preset.mode);
                setValues(preset.values);
              }}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Workbench */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left: Input Selection (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Input Parameters</h3>

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                Calculation Mode (Choose 2 Knowns)
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="voltage-current">Voltage (V) & Current (I) &rarr; Solve R, P</option>
                <option value="voltage-resistance">Voltage (V) & Resistance (R) &rarr; Solve I, P</option>
                <option value="current-resistance">Current (I) & Resistance (R) &rarr; Solve V, P</option>
                <option value="voltage-power">Voltage (V) & Power (P) &rarr; Solve I, R</option>
                <option value="current-power">Current (I) & Power (P) &rarr; Solve V, R</option>
                <option value="resistance-power">Resistance (R) & Power (P) &rarr; Solve V, I</option>
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Voltage */}
              <div className={`rounded-2xl border p-4 transition-all ${
                mode.includes('voltage') ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20' : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40 opacity-70'
              }`}>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2">
                  Voltage (V)
                  {mode.includes('voltage') && <span className="ml-1 text-[10px] text-emerald-600 font-semibold">[Input]</span>}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    value={values.voltageV}
                    disabled={!mode.includes('voltage')}
                    onChange={(e) => updateValue('voltageV', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                  <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">V</span>
                </div>
              </div>

              {/* Current */}
              <div className={`rounded-2xl border p-4 transition-all ${
                mode.includes('current') ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20' : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40 opacity-70'
              }`}>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2">
                  Current (I)
                  {mode.includes('current') && <span className="ml-1 text-emerald-600 text-[10px] font-semibold">[Input]</span>}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    value={values.currentA}
                    disabled={!mode.includes('current')}
                    onChange={(e) => updateValue('currentA', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                  <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">A</span>
                </div>
              </div>

              {/* Resistance */}
              <div className={`rounded-2xl border p-4 transition-all ${
                mode.includes('resistance') ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20' : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40 opacity-70'
              }`}>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2">
                  Resistance (R)
                  {mode.includes('resistance') && <span className="ml-1 text-emerald-600 text-[10px] font-semibold">[Input]</span>}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    value={values.resistanceOhms}
                    disabled={!mode.includes('resistance')}
                    onChange={(e) => updateValue('resistanceOhms', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                  <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">&Omega;</span>
                </div>
              </div>

              {/* Power */}
              <div className={`rounded-2xl border p-4 transition-all ${
                mode.includes('power') ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20' : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40 opacity-70'
              }`}>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-2">
                  Power (P)
                  {mode.includes('power') && <span className="ml-1 text-emerald-600 text-[10px] font-semibold">[Input]</span>}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    value={values.powerW}
                    disabled={!mode.includes('power')}
                    onChange={(e) => updateValue('powerW', e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                  <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">W</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results Telemetry (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Circuit Telemetry</h3>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>Live Solutions</span>
              </div>
            </div>

            {!result.ok ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
                {result.error}
              </div>
            ) : (
              <div className="space-y-4">
                {/* 4 Cards Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Voltage Card */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                      Voltage (V)
                    </span>
                    <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {formatNum(result.voltageV)} <span className="text-sm font-normal text-slate-500">V</span>
                    </div>
                  </div>

                  {/* Current Card */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                      Current (I)
                    </span>
                    <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {formatNum(result.currentA)} <span className="text-sm font-normal text-slate-500">A</span>
                    </div>
                  </div>

                  {/* Resistance Card */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                      Resistance (R)
                    </span>
                    <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {formatNum(result.resistanceOhms)} <span className="text-sm font-normal text-slate-500">&Omega;</span>
                    </div>
                  </div>

                  {/* Power Card */}
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/50 p-4 dark:border-emerald-500/20 dark:bg-emerald-950/20">
                    <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider block mb-1">
                      Dissipated Power (P)
                    </span>
                    <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
                      {formatNum(result.powerW)} <span className="text-sm font-normal text-emerald-600">W</span>
                    </div>
                  </div>
                </div>

                {/* Formula Breakdown */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                    Governing Equations Used
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-mono leading-relaxed">
                    {result.summary}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Theory Reference */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <Info className="w-4 h-4 text-emerald-500" />
              <span>Ohm’s Law Wheel Formulas</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 font-mono">
              <div>&bull; V = I &times; R = P / I = &radic;(P &times; R)</div>
              <div>&bull; I = V / R = P / V = &radic;(P / R)</div>
              <div>&bull; R = V / I = V&sup2; / P = P / I&sup2;</div>
              <div>&bull; P = V &times; I = I&sup2; &times; R = V&sup2; / R</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
        <Link
          to="/labs/smd"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous: Lab 02 &bull; SMD Resistor</span>
        </Link>
        <Link
          to="/labs/wire-cable"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors"
        >
          <span>Next: Lab 04 &bull; Wire & Cable</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
