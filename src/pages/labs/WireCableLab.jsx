import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Gauge,
  RotateCcw,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
} from 'lucide-react';
import { awgAreaMm2, estimateCableSize } from '../../lib/calculations/wireCable';

const WIRE_PRESETS = [
  { label: '12V Solar Run (15A, 10m, 3% drop)', awg: 10, material: 'copper', voltageV: 12, currentA: 15, lengthM: 10, dropPercent: 3, supplyType: 'dc' },
  { label: '230V AC Domestic Branch (16A, 25m, 3%)', awg: 14, material: 'copper', voltageV: 230, currentA: 16, lengthM: 25, dropPercent: 3, supplyType: 'single' },
  { label: '48V Battery Inverter Run (50A, 3m, 1%)', awg: 4, material: 'copper', voltageV: 48, currentA: 50, lengthM: 3, dropPercent: 1, supplyType: 'dc' },
  { label: '24V Industrial Sensor Loop (2A, 50m, 2%)', awg: 18, material: 'copper', voltageV: 24, currentA: 2, lengthM: 50, dropPercent: 2, supplyType: 'dc' },
];

const formatNum = (v, digits = 2) => {
  if (!Number.isFinite(v)) return '—';
  if (Math.abs(v) >= 1000) return v.toLocaleString(undefined, { maximumFractionDigits: digits });
  return Number(v).toLocaleString(undefined, { maximumFractionDigits: digits });
};

export default function WireCableLab() {
  const [awg, setAwg] = useState(12);
  const [material, setMaterial] = useState('copper');
  const [supplyType, setSupplyType] = useState('dc');
  const [voltageV, setVoltageV] = useState(230);
  const [currentA, setCurrentA] = useState(10);
  const [lengthM, setLengthM] = useState(25);
  const [dropPercent, setDropPercent] = useState(3);
  const [copied, setCopied] = useState(false);

  const awgArea = awgAreaMm2(awg);
  const cableEstimate = estimateCableSize({
    material,
    voltageV: Number(voltageV),
    currentA: Number(currentA),
    lengthM: Number(lengthM),
    allowedDropPercent: Number(dropPercent),
    supplyType,
  });

  const handleCopy = () => {
    if (!cableEstimate.ok) return;
    const text = `AWG ${awg} (${formatNum(awgArea)} mm²). Cable Requirement: ${formatNum(cableEstimate.requiredAreaMm2)} mm² (Recommended: AWG ${cableEstimate.nearestAwg ?? 'n/a'}) for ${voltageV}V, ${currentA}A, ${lengthM}m`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setAwg(12);
    setMaterial('copper');
    setSupplyType('dc');
    setVoltageV(230);
    setCurrentA(10);
    setLengthM(25);
    setDropPercent(3);
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
          <span className="font-semibold text-slate-900 dark:text-white">Lab 04: Wire & Cable Sizing</span>
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
      <div className="rounded-3xl border border-slate-200 bg-linear-to-r from-orange-500/10 via-amber-500/5 to-transparent p-6 sm:p-8 dark:border-slate-800 dark:from-orange-950/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-700 dark:border-orange-800 dark:bg-orange-950/80 dark:text-orange-300">
              <Gauge className="w-3.5 h-3.5" />
              <span>Lab 04 &bull; Conductor Sizing & Standards</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Wire Gauge & Cable Size Estimator
            </h1>
            <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Convert AWG (American Wire Gauge) standards to metric cross-sectional millimeters squared (mm²) and estimate the required conductor gauge based on allowed voltage drop.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:border-orange-400 hover:text-orange-600 shadow-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!cableEstimate.ok}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-orange-500 disabled:opacity-50"
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
          Practical Conductor Run Presets
        </span>
        <div className="flex flex-wrap gap-2">
          {WIRE_PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setAwg(p.awg);
                setMaterial(p.material);
                setVoltageV(p.voltageV);
                setCurrentA(p.currentA);
                setLengthM(p.lengthM);
                setDropPercent(p.dropPercent);
                setSupplyType(p.supplyType);
              }}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-orange-500 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:text-orange-400 transition-colors"
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
          {/* Section 1: AWG Converter */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">1. Direct AWG Size Converter</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                  AWG Gauge (4 to 40)
                </label>
                <input
                  type="number"
                  min="4"
                  max="40"
                  value={awg}
                  onChange={(e) => setAwg(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base font-mono font-bold text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>
              <div className="rounded-xl border border-orange-500/20 bg-orange-50/40 p-4 dark:border-orange-500/10 dark:bg-orange-950/20 flex flex-col justify-center">
                <span className="text-[10px] uppercase font-bold text-orange-700 dark:text-orange-400">Cross-Section Area</span>
                <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                  {formatNum(awgArea)} <span className="text-sm font-normal text-slate-500">mm²</span>
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Voltage Drop Sizing Parameters */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">2. Circuit Voltage Drop Parameters</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Conductor Material
                </label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  <option value="copper">Copper (Standard &rho; = 1.72&times;10⁻⁸ &Omega;&middot;m)</option>
                  <option value="aluminium">Aluminium (&rho; = 2.82&times;10⁻⁸ &Omega;&middot;m)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Supply Type
                </label>
                <select
                  value={supplyType}
                  onChange={(e) => setSupplyType(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  <option value="dc">DC (Direct Current 2-wire)</option>
                  <option value="single">AC Single-Phase (2-wire)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                  Nominal Voltage (V)
                </label>
                <input
                  type="number"
                  value={voltageV}
                  onChange={(e) => setVoltageV(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                  Design Current (A)
                </label>
                <input
                  type="number"
                  value={currentA}
                  onChange={(e) => setCurrentA(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                  One-Way Cable Run (m)
                </label>
                <input
                  type="number"
                  value={lengthM}
                  onChange={(e) => setLengthM(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                  Allowed Voltage Drop (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={dropPercent}
                  onChange={(e) => setDropPercent(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Sizing Results (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Sizing Analysis & Recommendation</h3>

            {!cableEstimate.ok ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
                {cableEstimate.error}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Hero Recommendation Card */}
                <div className="rounded-2xl border border-orange-500/30 bg-orange-50/50 p-5 dark:border-orange-500/20 dark:bg-orange-950/20">
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange-700 dark:text-orange-400 block mb-1">
                    Nearest Recommended AWG
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
                    AWG {cableEstimate.nearestAwg ?? 'Custom Sizing'}
                  </div>
                  <div className="mt-2 text-xs font-medium text-orange-800 dark:text-orange-300">
                    Required Minimum Conductor Area: <strong>{formatNum(cableEstimate.requiredAreaMm2)} mm²</strong>
                  </div>
                </div>

                {/* Voltage Drop Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                      Max Permitted Drop (V)
                    </span>
                    <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
                      {formatNum((Number(voltageV) * Number(dropPercent)) / 100)} V
                    </div>
                    <span className="text-[11px] text-slate-500">at {dropPercent}% allowed</span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                      Two-Way Loop Distance
                    </span>
                    <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
                      {Number(lengthM) * 2} m
                    </div>
                    <span className="text-[11px] text-slate-500">Go & return path</span>
                  </div>
                </div>

                {/* Note Breakdown */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                    Engineering Note
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {cableEstimate.note}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Safety Notice */}
          <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-5 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Safety & Code Compliance Disclaimer</span>
            </div>
            <p className="text-xs leading-relaxed">
              This calculator provides educational estimates based strictly on resistive voltage drop. Real-world electrical installations must also account for ampacity limits, ambient temperature derating, conduit fill factors, and National Electrical Code (NEC/IEC) standards.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
        <Link
          to="/labs/ohms-law"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous: Lab 03 &bull; Ohm’s Law</span>
        </Link>
        <Link
          to="/labs/power"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors"
        >
          <span>Next: Lab 05 &bull; AC & DC Power</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
