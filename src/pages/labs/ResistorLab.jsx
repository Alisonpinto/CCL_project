import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CircuitBoard,
  RotateCcw,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Info,
} from 'lucide-react';
import { decodeResistor, RESISTOR_COLOURS } from '../../lib/calculations/resistor';

const resistorBandOptions = Object.keys(RESISTOR_COLOURS);

const PRESETS = [
  { label: '220 Ω (LED Current Limiter)', mode: '4', colours: ['red', 'red', 'brown', 'gold'] },
  { label: '1 kΩ (General Purpose)', mode: '4', colours: ['brown', 'black', 'red', 'gold'] },
  { label: '4.7 kΩ (I2C Pull-up)', mode: '4', colours: ['yellow', 'violet', 'red', 'gold'] },
  { label: '10 kΩ (Microcontroller Pull-up)', mode: '4', colours: ['brown', 'black', 'orange', 'gold'] },
  { label: '100 kΩ 1% (Precision Divider)', mode: '5', colours: ['brown', 'black', 'black', 'orange', 'brown'] },
  { label: '470 kΩ 1% (High Impedance)', mode: '5', colours: ['yellow', 'violet', 'black', 'orange', 'brown'] },
];

export default function ResistorLab() {
  const [bandMode, setBandMode] = useState('4');
  const [colours, setColours] = useState(['brown', 'black', 'red', 'gold']);
  const [copied, setCopied] = useState(false);

  const result = decodeResistor({ bandMode, colours });

  const applyBandMode = (nextMode) => {
    setBandMode(nextMode);
    if (nextMode === '4') {
      setColours(['brown', 'black', 'red', 'gold']);
    } else {
      setColours(['brown', 'black', 'black', 'red', 'brown']);
    }
  };

  const updateColour = (index, colour) => {
    const next = [...colours];
    next[index] = colour;
    setColours(next);
  };

  const handleCopy = () => {
    if (!result.ok) return;
    const text = `Resistor Value: ${result.nominalText} ±${result.tolerancePercent}% (${result.minText} - ${result.maxText})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    applyBandMode('4');
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
          <span className="font-semibold text-slate-900 dark:text-white">Lab 01: Resistor Colour Code</span>
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
              <CircuitBoard className="w-3.5 h-3.5" />
              <span>Lab 01 &bull; Component Identification</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Resistor Colour-Code Calculator
            </h1>
            <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Calculate the nominal resistance value, tolerance window, and minimum/maximum limits for standard 4-band and 5-band axial through-hole resistors.
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
          Popular Standard Lab Presets
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                setBandMode(preset.mode);
                setColours(preset.colours);
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
        {/* Left: Resistor Graphic & Band Pickers (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Band Configuration</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Choose 4-band (standard) or 5-band (high precision)</p>
              </div>
              <div className="flex gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-950">
                {['4', '5'].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => applyBandMode(mode)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                      bandMode === mode
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {mode}-Band
                  </button>
                ))}
              </div>
            </div>

            {/* Tactile Resistor Visual Representation */}
            <div className="rounded-2xl border border-slate-200 bg-slate-100/80 p-8 text-center dark:border-slate-800 dark:bg-slate-950/60 mb-8">
              <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-4">
                Interactive Resistor Schematic
              </div>
              <div className="flex items-center justify-center">
                {/* Left Lead */}
                <div className="h-2 w-12 sm:w-20 bg-linear-to-b from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 rounded-l-full shadow-inner" />
                
                {/* Resistor Body */}
                <div className="relative flex h-24 w-72 sm:w-96 items-stretch justify-between overflow-hidden rounded-3xl border-2 border-amber-900/20 bg-linear-to-b from-[#e8d5b5] via-[#dfc8a2] to-[#c9ad84] px-4 shadow-xl dark:border-slate-700 dark:from-[#d1b892] dark:via-[#c5aa81] dark:to-[#ab8e66]">
                  {/* Subtle 3D shine overlay */}
                  <div className="absolute inset-x-0 top-0 h-4 bg-white/30 rounded-t-3xl pointer-events-none" />

                  {Array.from({ length: Number(bandMode) }).map((_, index) => {
                    const colorKey = colours[index];
                    const colorData = RESISTOR_COLOURS[colorKey] || { tone: '#ddd' };
                    const isTolerance = index === Number(bandMode) - 1;
                    return (
                      <div
                        key={`resistor-band-${index}`}
                        className={`relative w-7 sm:w-9 h-full flex flex-col justify-end items-center pb-2 transition-all shadow-md ${
                          isTolerance ? 'ml-auto' : ''
                        }`}
                        style={{ backgroundColor: colorData.tone || colorKey }}
                      >
                        <span className="rounded-sm bg-slate-950/80 px-1 py-0.5 text-[9px] font-mono font-bold text-white shadow-xs">
                          {index + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Right Lead */}
                <div className="h-2 w-12 sm:w-20 bg-linear-to-b from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 rounded-r-full shadow-inner" />
              </div>

              <div className="mt-4 flex justify-center gap-6 text-[11px] text-slate-500 dark:text-slate-400">
                <span>Bands 1-{Number(bandMode) - 2}: Significant Digits</span>
                <span>Band {Number(bandMode) - 1}: Multiplier</span>
                <span>Band {bandMode}: Tolerance</span>
              </div>
            </div>

            {/* Band Colour Selectors */}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {Array.from({ length: Number(bandMode) }).map((_, index) => {
                const isTolerance = index === Number(bandMode) - 1;
                const isMultiplier = index === Number(bandMode) - 2;
                let role = `Digit ${index + 1}`;
                if (isMultiplier) role = 'Multiplier';
                if (isTolerance) role = 'Tolerance (±%)';

                return (
                  <div key={`band-select-${index}`} className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        Band {index + 1}
                      </span>
                      <span className="text-[10px] uppercase font-semibold text-slate-400">
                        {role}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className="w-5 h-5 rounded-md border border-black/20 shrink-0"
                        style={{ backgroundColor: RESISTOR_COLOURS[colours[index]]?.tone || colours[index] }}
                      />
                      <select
                        value={colours[index]}
                        onChange={(e) => updateColour(index, e.target.value)}
                        className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold capitalize text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      >
                        {resistorBandOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Results & Engineering Insights (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Calculated Specifications</h3>

            {!result.ok ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
                {result.error}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Main Hero Result Box */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/50 p-5 dark:border-emerald-500/20 dark:bg-emerald-950/20">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                    Nominal Resistance
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
                    {result.nominalText}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs font-medium text-emerald-800 dark:text-emerald-300">
                    <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 font-bold">
                      ±{result.tolerancePercent}% Tolerance
                    </span>
                    <span>Standard EIA rated</span>
                  </div>
                </div>

                {/* Min / Max Range */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                      Minimum (Lower Bound)
                    </span>
                    <div className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                      {result.minText}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                      Maximum (Upper Bound)
                    </span>
                    <div className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                      {result.maxText}
                    </div>
                  </div>
                </div>

                {/* Decoded Breakdown */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                    Decoded Band Sequence
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-mono leading-relaxed">
                    {result.decodedBands}
                  </p>
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Substitution: </span>
                    {result.formula}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Theory Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <Info className="w-4 h-4 text-emerald-500" />
              <span>Standard Mnemonic</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Remember the color sequence using the classic electronics mnemonic:
              <br />
              <strong className="text-emerald-600 dark:text-emerald-400">
                B B R O Y G B V G W
              </strong>{' '}
              (Black 0, Brown 1, Red 2, Orange 3, Yellow 4, Green 5, Blue 6, Violet 7, Grey 8, White 9; Gold ±5%, Silver ±10%).
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Between Labs */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
        <Link
          to="/labs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Labs</span>
        </Link>
        <Link
          to="/labs/smd"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors"
        >
          <span>Next: Lab 02 &bull; SMD Resistor</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
