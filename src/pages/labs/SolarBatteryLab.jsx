import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BatteryCharging,
  Sun,
  RotateCcw,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { calculateBatteryBackup, calculateSolarArray } from '../../lib/calculations/solarBattery';

const SOLAR_PRESETS = [
  {
    label: 'Home Critical Backup (500W load, 24V 200Ah LiFePO4)',
    type: 'battery',
    battery: { loadPowerW: 500, batteryVoltageV: 24, batteryCapacityAh: 200, depthOfDischarge: 0.85, inverterEfficiency: 0.92 },
  },
  {
    label: 'Telecom Repeater (150W load, 48V 100Ah battery)',
    type: 'battery',
    battery: { loadPowerW: 150, batteryVoltageV: 48, batteryCapacityAh: 100, depthOfDischarge: 0.8, inverterEfficiency: 0.9 },
  },
  {
    label: 'Off-Grid Cabin PV (3000 Wh/day, 5 PSH, 450W panels)',
    type: 'solar',
    solar: { dailyEnergyWh: 3000, peakSunHours: 5, systemEfficiency: 0.78, panelRatingW: 450 },
  },
  {
    label: 'Solar Water Pump System (5000 Wh/day, 5.5 PSH, 550W panels)',
    type: 'solar',
    solar: { dailyEnergyWh: 5000, peakSunHours: 5.5, systemEfficiency: 0.82, panelRatingW: 550 },
  },
];

const formatNum = (v, digits = 2) => {
  if (!Number.isFinite(v)) return '—';
  if (Math.abs(v) >= 1000) return v.toLocaleString(undefined, { maximumFractionDigits: digits });
  return Number(v).toLocaleString(undefined, { maximumFractionDigits: digits });
};

export default function SolarBatteryLab() {
  const [mode, setMode] = useState('battery');
  const [batteryData, setBatteryData] = useState({
    loadPowerW: 200,
    batteryVoltageV: 12,
    batteryCapacityAh: 100,
    depthOfDischarge: 0.8,
    inverterEfficiency: 0.9,
  });
  const [solarData, setSolarData] = useState({
    dailyEnergyWh: 2500,
    peakSunHours: 5,
    systemEfficiency: 0.8,
    panelRatingW: 400,
  });
  const [copied, setCopied] = useState(false);

  const batteryResult = calculateBatteryBackup({
    loadPowerW: Number(batteryData.loadPowerW),
    batteryVoltageV: Number(batteryData.batteryVoltageV),
    batteryCapacityAh: Number(batteryData.batteryCapacityAh),
    depthOfDischarge: Number(batteryData.depthOfDischarge),
    inverterEfficiency: Number(batteryData.inverterEfficiency),
  });

  const solarResult = calculateSolarArray({
    dailyEnergyWh: Number(solarData.dailyEnergyWh),
    peakSunHours: Number(solarData.peakSunHours),
    systemEfficiency: Number(solarData.systemEfficiency),
    panelRatingW: Number(solarData.panelRatingW),
  });

  const handleCopy = () => {
    let text = '';
    if (mode === 'battery') {
      if (!batteryResult.ok) return;
      text = `Battery Backup: ${formatNum(batteryResult.backupHours)} hours runtime for ${batteryData.loadPowerW}W load (${formatNum(batteryResult.usableWh)} Wh usable energy).`;
    } else {
      if (!solarResult.ok) return;
      text = `Solar PV Array: Required ${formatNum(solarResult.requiredArrayPowerW)} W array (${solarResult.panelCount} × ${solarData.panelRatingW}W panels) for ${solarData.dailyEnergyWh} Wh/day.`;
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setBatteryData({
      loadPowerW: 200,
      batteryVoltageV: 12,
      batteryCapacityAh: 100,
      depthOfDischarge: 0.8,
      inverterEfficiency: 0.9,
    });
    setSolarData({
      dailyEnergyWh: 2500,
      peakSunHours: 5,
      systemEfficiency: 0.8,
      panelRatingW: 400,
    });
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
          <span className="font-semibold text-slate-900 dark:text-white">Lab 07: Solar & Battery Sizing</span>
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
      <div className="rounded-3xl border border-slate-200 bg-linear-to-r from-yellow-500/10 via-emerald-500/5 to-transparent p-6 sm:p-8 dark:border-slate-800 dark:from-yellow-950/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950/80 dark:text-yellow-300">
              <BatteryCharging className="w-3.5 h-3.5" />
              <span>Lab 07 &bull; Renewable Energy Storage</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Solar Array & Battery Backup Sizing
            </h1>
            <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Design standalone renewable systems: calculate battery bank discharge autonomy and size photovoltaic (PV) solar panel arrays to cover daily watt-hour demands.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:border-yellow-400 hover:text-yellow-600 shadow-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-amber-500"
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
          Practical Solar & Energy Storage Presets
        </span>
        <div className="flex flex-wrap gap-2">
          {SOLAR_PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setMode(p.type);
                if (p.battery) setBatteryData(p.battery);
                if (p.solar) setSolarData(p.solar);
              }}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-amber-500 hover:text-amber-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:text-amber-400 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Selector */}
      <div className="flex rounded-2xl border border-slate-200 bg-slate-100 p-1.5 dark:border-slate-800 dark:bg-slate-900">
        <button
          type="button"
          onClick={() => setMode('battery')}
          className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs sm:text-sm font-bold transition-all ${
            mode === 'battery'
              ? 'bg-white text-emerald-600 shadow-sm dark:bg-slate-800 dark:text-emerald-400'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          <BatteryCharging className="w-4 h-4" />
          <span>Battery Storage Runtime Model</span>
        </button>
        <button
          type="button"
          onClick={() => setMode('solar')}
          className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs sm:text-sm font-bold transition-all ${
            mode === 'solar'
              ? 'bg-white text-amber-600 shadow-sm dark:bg-slate-800 dark:text-amber-400'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          <Sun className="w-4 h-4" />
          <span>Solar PV Array Sizing Model</span>
        </button>
      </div>

      {/* Main Interactive Workbench */}
      {mode === 'battery' ? (
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left: Battery Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Battery Bank Parameters</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                    Continuous Load Power (W)
                  </label>
                  <input
                    type="number"
                    value={batteryData.loadPowerW}
                    onChange={(e) => setBatteryData((prev) => ({ ...prev, loadPowerW: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                  <span className="text-[10px] text-slate-400">Total active equipment wattage</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                    Battery Voltage (V)
                  </label>
                  <select
                    value={batteryData.batteryVoltageV}
                    onChange={(e) => setBatteryData((prev) => ({ ...prev, batteryVoltageV: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    <option value="12">12 V (Standard Small System)</option>
                    <option value="24">24 V (Mid-scale Off-grid)</option>
                    <option value="48">48 V (High Capacity Residential/Telecom)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                    Nominal Capacity (Ah)
                  </label>
                  <input
                    type="number"
                    value={batteryData.batteryCapacityAh}
                    onChange={(e) => setBatteryData((prev) => ({ ...prev, batteryCapacityAh: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                  <span className="text-[10px] text-slate-400">Amp-hour rating</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                    Depth of Discharge (DoD)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="0.1"
                    max="1.0"
                    value={batteryData.depthOfDischarge}
                    onChange={(e) => setBatteryData((prev) => ({ ...prev, depthOfDischarge: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                  <span className="text-[10px] text-slate-400">0.50 (Lead-Acid) &bull; 0.85-0.90 (Lithium)</span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                    Inverter Efficiency (&eta;)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.5"
                    max="1.0"
                    value={batteryData.inverterEfficiency}
                    onChange={(e) => setBatteryData((prev) => ({ ...prev, inverterEfficiency: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                  <span className="text-[10px] text-slate-400">Typically 0.88 - 0.95 for pure sine wave inverters</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Battery Results (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Autonomy & Energy Reserves</h3>

              {!batteryResult.ok ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
                  {batteryResult.error}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Hero Result */}
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/50 p-5 dark:border-emerald-500/20 dark:bg-emerald-950/20">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                      Estimated Continuous Backup
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
                      {formatNum(batteryResult.backupHours)} <span className="text-sm font-normal text-slate-500">Hours</span>
                    </div>
                    <div className="mt-2 text-xs font-medium text-emerald-800 dark:text-emerald-300">
                      Approx. {formatNum(batteryResult.backupHours / 24, 1)} days of continuous power
                    </div>
                  </div>

                  {/* Energy Breakdown */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                        Nominal Bank Capacity
                      </span>
                      <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
                        {formatNum(batteryResult.nominalWh)} Wh
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">
                        ({formatNum(batteryResult.nominalWh / 1000, 2)} kWh)
                      </span>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                        Usable Energy Storage
                      </span>
                      <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
                        {formatNum(batteryResult.usableWh)} Wh
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">
                        ({formatNum(batteryResult.usableWh / 1000, 2)} kWh after DoD)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left: Solar Inputs (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Solar PV Parameters</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                    Daily Energy Demand (Wh/day)
                  </label>
                  <input
                    type="number"
                    value={solarData.dailyEnergyWh}
                    onChange={(e) => setSolarData((prev) => ({ ...prev, dailyEnergyWh: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-amber-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                  <span className="text-[10px] text-slate-400">Total consumption required per 24 hours</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                    Peak Sun Hours (PSH)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={solarData.peakSunHours}
                    onChange={(e) => setSolarData((prev) => ({ ...prev, peakSunHours: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-amber-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                  <span className="text-[10px] text-slate-400">Equivalent 1000 W/m² irradiance hours</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                    System Efficiency (BOS)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.5"
                    max="1.0"
                    value={solarData.systemEfficiency}
                    onChange={(e) => setSolarData((prev) => ({ ...prev, systemEfficiency: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-amber-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                  <span className="text-[10px] text-slate-400">Accounts for dirt, cable loss & temperature</span>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-900 dark:text-white mb-1.5">
                    Individual Panel Rating (W)
                  </label>
                  <input
                    type="number"
                    value={solarData.panelRatingW}
                    onChange={(e) => setSolarData((prev) => ({ ...prev, panelRatingW: e.target.value }))}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono text-slate-900 outline-none focus:border-amber-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                  <span className="text-[10px] text-slate-400">Watt-peak rating per module (e.g. 400W, 550W)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Solar Results (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Array Sizing Report</h3>

              {!solarResult.ok ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">
                  {solarResult.error}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Hero Result */}
                  <div className="rounded-2xl border border-amber-500/30 bg-amber-50/50 p-5 dark:border-amber-500/20 dark:bg-amber-950/20">
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
                      Required Solar Array Capacity
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
                      {formatNum(solarResult.requiredArrayPowerW)} <span className="text-sm font-normal text-slate-500">W</span>
                    </div>
                    <div className="mt-2 text-xs font-medium text-amber-800 dark:text-amber-300">
                      Approx. {formatNum(solarResult.requiredArrayPowerW / 1000, 2)} kWp Installed Solar Capacity
                    </div>
                  </div>

                  {/* Modules & Generation */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                        Recommended Panel Count
                      </span>
                      <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                        {solarResult.panelCount ?? '—'} <span className="text-xs font-normal text-slate-500">Panels</span>
                      </div>
                      <span className="text-[11px] text-slate-500">at {solarData.panelRatingW}W per module</span>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                        Estimated Daily Harvest
                      </span>
                      <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
                        {formatNum(solarResult.estimatedDailyGenerationWh)} Wh
                      </div>
                      <span className="text-[11px] text-slate-500">at {solarData.peakSunHours} PSH</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
        <Link
          to="/labs/unit-converter"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous: Lab 06 &bull; Unit Converter</span>
        </Link>
        <Link
          to="/labs/safety"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors"
        >
          <span>Next: Lab 08 &bull; Safety Guide</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
