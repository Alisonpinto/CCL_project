import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpenText,
  RotateCcw,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  ArrowLeftRight,
  Info,
} from 'lucide-react';
import { UNIT_CATEGORIES, convertUnit } from '../../lib/calculations/units';

const CONVERTER_PRESETS = [
  { label: '1 kV to V (Grid transmission)', category: 'electrical', from: 'kV', to: 'V', value: '1' },
  { label: '500 mA to A (USB load)', category: 'electrical', from: 'mA', to: 'A', value: '500' },
  { label: '4.7 kΩ to Ω (Pull-up resistor)', category: 'electrical', from: 'kΩ', to: 'Ω', value: '4.7' },
  { label: '10 hp to kW (Motor rating)', category: 'electrical', from: 'hp', to: 'kW', value: '10' },
  { label: '100 mil to mm (PCB trace pitch)', category: 'length', from: 'mil', to: 'mm', value: '100' },
  { label: '12 AWG to mm² (Branch wire)', category: 'wire', from: '12', to: 'mm²', value: '1' },
];

export default function UnitConverterLab() {
  const [category, setCategory] = useState('electrical');
  const [fromUnit, setFromUnit] = useState('V');
  const [toUnit, setToUnit] = useState('mV');
  const [value, setValue] = useState('1');
  const [copied, setCopied] = useState(false);

  const unitOptions = Object.keys(UNIT_CATEGORIES[category] || {});
  const result = convertUnit({ category, fromUnit, toUnit, value });

  const handleCategoryChange = (nextCategory) => {
    const nextOptions = Object.keys(UNIT_CATEGORIES[nextCategory] || {});
    setCategory(nextCategory);
    setFromUnit(nextOptions[0] || '');
    setToUnit(nextOptions[1] || nextOptions[0] || '');
  };

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleCopy = () => {
    if (!result.ok) return;
    const text = `${value} ${fromUnit} = ${result.resultText}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCategory('electrical');
    setFromUnit('V');
    setToUnit('mV');
    setValue('1');
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
          <span className="font-semibold text-slate-900 dark:text-white">Lab 06: Unit Converter</span>
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
      <div className="rounded-3xl border border-slate-200 bg-linear-to-r from-cyan-500/10 via-blue-500/5 to-transparent p-6 sm:p-8 dark:border-slate-800 dark:from-cyan-950/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:border-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300">
              <BookOpenText className="w-3.5 h-3.5" />
              <span>Lab 06 &bull; SI Standards & Conversions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Electrical & Engineering Unit Converter
            </h1>
            <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Convert between engineering multiples, sub-multiples, imperial lengths, metric dimensions, and AWG wire sizes with full precision.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:border-cyan-400 hover:text-cyan-600 shadow-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!result.ok}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-cyan-500 disabled:opacity-50"
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
          Frequent Engineering Conversion Presets
        </span>
        <div className="flex flex-wrap gap-2">
          {CONVERTER_PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setCategory(p.category);
                setFromUnit(p.from);
                setToUnit(p.to);
                setValue(p.value);
              }}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:text-cyan-400 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Workbench */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left: Input Selection (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Conversion Configuration</h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                Conversion Domain
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'electrical', label: 'Electrical Units' },
                  { id: 'length', label: 'Lengths & Pitch' },
                  { id: 'wire', label: 'Wire Gauges' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleCategoryChange(c.id)}
                    className={`rounded-xl py-2.5 text-xs font-bold transition-all border ${
                      category === c.id
                        ? 'border-cyan-600 bg-cyan-600 text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                  Input Value
                </label>
                <input
                  type="number"
                  step="any"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-mono font-bold text-slate-900 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2.5">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                    From Unit
                  </label>
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {unitOptions.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleSwap}
                    className="p-2.5 rounded-xl border border-slate-300 bg-slate-50 hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 transition-colors"
                    title="Swap From and To units"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                    To Target Unit
                  </label>
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {unitOptions.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Converted Output</h3>

            {!result.ok ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
                {result.error}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Hero Result */}
                <div className="rounded-2xl border border-cyan-500/30 bg-cyan-50/50 p-5 dark:border-cyan-500/20 dark:bg-cyan-950/20">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 block mb-1">
                    Direct Conversion
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono break-words">
                    {result.resultText}
                  </div>
                  <div className="mt-2 text-xs font-medium text-cyan-800 dark:text-cyan-300">
                    Source: {value} {fromUnit}
                  </div>
                </div>

                {/* Explanation */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                    Conversion Principle
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Evaluated using base-unit standardisation. For AWG cross-sectional wire gauges, values follow the exact ASTM B258 logarithmic relationship: d<sub>n</sub> = 0.127 &times; 92<sup>(36 - n)/39</sup> mm.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Reference Table */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <Info className="w-4 h-4 text-cyan-500" />
              <span>Standard Engineering SI Prefixes</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600 dark:text-slate-300 font-mono">
              <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-950">M (Mega): 10⁶</div>
              <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-950">k (Kilo): 10³</div>
              <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-950">m (Milli): 10⁻³</div>
              <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-950">&mu; (Micro): 10⁻⁶</div>
              <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-950">n (Nano): 10⁻⁹</div>
              <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-950">p (Pico): 10⁻¹²</div>
              <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-950">mil: 0.001 in</div>
              <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-950">1 hp: 745.7 W</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
        <Link
          to="/labs/power"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous: Lab 05 &bull; AC & DC Power</span>
        </Link>
        <Link
          to="/labs/solar-battery"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors"
        >
          <span>Next: Lab 07 &bull; Solar & Battery</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
