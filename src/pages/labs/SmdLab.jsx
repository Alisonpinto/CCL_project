import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  RotateCcw,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Info,
} from 'lucide-react';
import { decodeSmdCode } from '../../lib/calculations/smd';

const SMD_PRESETS = [
  { code: '472', format: '3-digit', desc: '4.7 kΩ (Standard 5%)' },
  { code: '103', format: '3-digit', desc: '10 kΩ (Standard 5%)' },
  { code: '1002', format: '4-digit', desc: '10 kΩ 1% (Precision)' },
  { code: '49R9', format: 'r-notation', desc: '49.9 Ω 1% (Termination)' },
  { code: '4R7', format: 'r-notation', desc: '4.7 Ω (Low resistance)' },
  { code: 'R050', format: 'r-notation', desc: '0.05 Ω (Current Sense)' },
  { code: '000', format: '3-digit', desc: '0 Ω (Jumper link)' },
];

export default function SmdLab() {
  const [value, setValue] = useState('472');
  const [format, setFormat] = useState('auto');
  const [copied, setCopied] = useState(false);

  const result = decodeSmdCode(value, format);

  const handleCopy = () => {
    if (!result.ok) return;
    const text = `SMD Code ${value.toUpperCase()} = ${result.nominalText} (${result.method})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setValue('472');
    setFormat('auto');
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
          <span className="font-semibold text-slate-900 dark:text-white">Lab 02: SMD Resistor Code</span>
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
      <div className="rounded-3xl border border-slate-200 bg-linear-to-r from-blue-500/10 via-indigo-500/5 to-transparent p-6 sm:p-8 dark:border-slate-800 dark:from-blue-950/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-800 dark:bg-blue-950/80 dark:text-blue-300">
              <Calculator className="w-3.5 h-3.5" />
              <span>Lab 02 &bull; Surface Mount Technology</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              SMD Resistor Code Calculator
            </h1>
            <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Decode 3-digit (5%), 4-digit (1% precision), and R-notation decimal marking systems commonly stamped on 0402, 0603, 0805, and 1206 surface-mount chips.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:border-blue-400 hover:text-blue-600 shadow-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!result.ok}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-500 disabled:opacity-50"
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
          Popular Standard SMD Codes
        </span>
        <div className="flex flex-wrap gap-2">
          {SMD_PRESETS.map((preset) => (
            <button
              key={preset.code}
              type="button"
              onClick={() => {
                setValue(preset.code);
                setFormat(preset.format);
              }}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
            >
              <strong className="font-mono text-slate-900 dark:text-white mr-1.5">{preset.code}</strong>
              <span className="text-slate-500 dark:text-slate-400">({preset.desc})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Workbench */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left: Input & SMD Visual (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Chip Code Entry</h3>

            {/* SMD Tactile Chip Preview */}
            <div className="rounded-2xl border border-slate-200 bg-slate-100/80 p-8 text-center dark:border-slate-800 dark:bg-slate-950/60 mb-6">
              <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-4">
                SMD Package Footprint Visual (e.g. 1206 / 0805)
              </div>
              
              <div className="flex items-center justify-center">
                {/* SMD Resistor Body */}
                <div className="relative flex h-28 w-64 items-center justify-center rounded-xl border-4 border-slate-700 bg-slate-900 shadow-2xl">
                  {/* Left solder termination */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 rounded-l-md bg-linear-to-r from-slate-300 to-slate-400 border-r-2 border-slate-600 shadow-inner" />
                  
                  {/* Stamped Code on Ceramic Body */}
                  <div className="px-10 text-center z-10">
                    <span className="font-mono text-3xl sm:text-4xl font-black tracking-widest text-white drop-shadow-md">
                      {value ? value.toUpperCase() : '---'}
                    </span>
                    <div className="text-[9px] uppercase tracking-widest text-slate-400 mt-1">
                      SMD Marking
                    </div>
                  </div>

                  {/* Right solder termination */}
                  <div className="absolute right-0 top-0 bottom-0 w-8 rounded-r-md bg-linear-to-l from-slate-300 to-slate-400 border-l-2 border-slate-600 shadow-inner" />
                </div>
              </div>
            </div>

            {/* Input form */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                  SMD Marking String
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value.trim())}
                    placeholder="e.g. 472, 1002, 4R7, 000"
                    className="flex-1 font-mono uppercase text-base rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                  <button
                    type="button"
                    onClick={() => setValue('')}
                    className="rounded-xl border border-slate-300 px-4 py-3 text-xs font-semibold text-slate-700 hover:border-slate-400 dark:border-slate-700 dark:text-slate-300"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                  Format Mode
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  <option value="auto">Auto-detect system (Recommended)</option>
                  <option value="3-digit">Standard 3-digit (e.g. 103 = 10kΩ)</option>
                  <option value="4-digit">Precision 4-digit (e.g. 1002 = 10kΩ)</option>
                  <option value="r-notation">R-notation Decimal (e.g. 4R7 = 4.7Ω)</option>
                  <option value="eia-96">EIA-96 (Not standard decimal multiplier)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Calculated Resistance</h3>

            {!result.ok ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
                {result.error}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Hero Result */}
                <div className="rounded-2xl border border-blue-500/30 bg-blue-50/50 p-5 dark:border-blue-500/20 dark:bg-blue-950/20">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400 block mb-1">
                    Decoded Resistance
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
                    {result.nominalText}
                  </div>
                  <div className="mt-2 text-xs font-medium text-blue-800 dark:text-blue-300">
                    Detected System: <strong>{result.method}</strong>
                  </div>
                </div>

                {/* Worked Breakdown */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                    Step-by-Step Explanation
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-mono leading-relaxed">
                    {result.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Theory Reference */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <Info className="w-4 h-4 text-blue-500" />
              <span>SMD Marking Conventions</span>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
              <li>
                <strong>3-Digit:</strong> First two digits are significant numbers; third digit is the 10<sup>n</sup> multiplier (e.g. 472 = 47 × 10² = 4,700 Ω = 4.7 kΩ).
              </li>
              <li>
                <strong>4-Digit:</strong> First three digits are significant numbers; fourth digit is the multiplier (e.g. 1002 = 100 × 10² = 10,000 Ω = 10 kΩ).
              </li>
              <li>
                <strong>R-Notation:</strong> The letter &lsquo;R&rsquo; acts as the decimal separator (e.g. 4R7 = 4.7 Ω, R050 = 0.05 Ω).
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
        <Link
          to="/labs/resistor"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous: Lab 01 &bull; Resistor Colour Code</span>
        </Link>
        <Link
          to="/labs/ohms-law"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors"
        >
          <span>Next: Lab 03 &bull; Ohm’s Law</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
