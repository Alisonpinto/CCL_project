import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ArrowRight,
  Printer,
  Search,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

const EXPERIMENTS = [
  {
    id: 'exp1',
    number: 'Experiment 01',
    title: 'Resistor Colour-Coding & Tolerance Verification',
    labPath: '/labs/resistor',
    aim: 'To determine the nominal resistance and tolerance limits of 4-band and 5-band through-hole resistors using standard EIA colour codes.',
    apparatus: 'Resistor Colour Code Simulator, Virtual Decade Resistance Box, Digital Multimeter.',
    theory: 'Axial carbon film and metal film resistors are marked with coloured bands to indicate their resistance in ohms and their precision tolerance. 4-band resistors utilize 2 significant digits followed by a decade multiplier and a tolerance band (commonly Gold ±5% or Silver ±10%). 5-band precision resistors provide 3 significant digits, a multiplier, and a tolerance band (commonly Brown ±1%).',
    formula: 'R = (Digit₁ × 10 + Digit₂) × Multiplier ± Tolerance%',
    procedure: [
      'Orient the resistor so that the tolerance band (Gold, Silver, or Brown spaced further apart) is positioned on the extreme right.',
      'Read the first two colour bands from left to right as significant digits.',
      'Read the third band as the power of ten multiplier (e.g., Red = 10² = 100).',
      'Compute the nominal value in ohms and apply the tolerance percentage to derive the minimum and maximum acceptable bounds.',
      'Verify the decoded resistance by selecting the colors in Lab 01.',
    ],
    viva: [
      { q: 'Why do 5-band resistors have an extra band compared to 4-band resistors?', a: 'To provide a third significant digit, which is essential for high-precision E96 and E192 series 1% resistors.' },
      { q: 'What is the tolerance value denoted by a Gold band?', a: 'Gold represents ±5% tolerance when in the tolerance position, or ×0.1 when in the multiplier position.' },
    ],
  },
  {
    id: 'exp2',
    number: 'Experiment 02',
    title: 'Surface Mount Device (SMD) Resistor Identification',
    labPath: '/labs/smd',
    aim: 'To decode resistance values stamped on miniature surface-mount ceramic chip resistors across 3-digit, 4-digit, and R-notation systems.',
    apparatus: 'SMD Decoder Simulator, Digital Caliper for chip footprint inspection.',
    theory: 'Due to severe space constraints on modern printed circuit boards (0402, 0603, 0805, 1206 packages), color bands are replaced with printed numeric codes. Standard 3-digit codes denote 2 digits plus a multiplier. 4-digit codes represent 3 digits plus a multiplier. For values below 10 ohms, the letter ‘R’ is inserted as a decimal point.',
    formula: '3-Digit: AB × 10ⁿ Ω | 4-Digit: ABC × 10ⁿ Ω | R-Notation: A R B = A.B Ω',
    procedure: [
      'Inspect the top ceramic surface of the SMD component under magnification.',
      'Check if the code consists of 3 numbers (e.g. 472), 4 numbers (e.g. 1002), or contains the letter R (e.g. 4R7).',
      'If 3 digits, multiply the first two digits by 10 raised to the third digit.',
      'If the letter R is present, substitute R with a decimal point.',
      'Input the code into Lab 02 to check the calculated value and engineering prefix.',
    ],
    viva: [
      { q: 'What does an SMD code of "000" indicate?', a: 'It indicates a zero-ohm link or jumper, used to bridge PCB traces without inserting an extra wire.' },
      { q: 'What is the value of an SMD resistor marked "R050"?', a: 'It represents 0.050 Ω (50 mΩ), typically used as a current-sensing shunt resistor.' },
    ],
  },
  {
    id: 'exp3',
    number: 'Experiment 03',
    title: 'Verification of Ohm’s Law and Electrical Power Dissipation',
    labPath: '/labs/ohms-law',
    aim: 'To verify the mathematical relationship between Voltage, Current, Resistance, and Dissipated Power in electrical circuits.',
    apparatus: 'Regulated DC Power Supply, Ammeter, Voltmeter, Rheostat, Lab 03 Simulator.',
    theory: 'Ohm’s Law states that the current flowing through a conductor between two points is directly proportional to the voltage across the two points, provided physical conditions such as temperature remain constant (V = I × R). Power dissipated as heat is governed by Joule’s Law: P = V × I = I² × R = V² / R.',
    formula: 'V = I × R | I = V / R | R = V / I | P = V × I = I²R',
    procedure: [
      'Connect the resistive load in series with an ammeter and across a variable DC voltage supply.',
      'Vary the supply voltage in discrete increments (e.g., 2V, 4V, 6V, 8V, 10V, 12V).',
      'Record corresponding current readings and verify the linear V-I relationship.',
      'Calculate the power dissipation for each state and observe that power grows quadratically with current.',
      'Cross-check calculations with the Ohm’s Law Solver in Lab 03.',
    ],
    viva: [
      { q: 'Under what physical conditions does Ohm’s law fail?', a: 'When temperature varies significantly (non-ohmic behavior like incandescent filaments), or in semiconductors (diodes, transistors).' },
      { q: 'If the voltage across a resistor is doubled, how does the dissipated power change?', a: 'Power quadruples because P is proportional to V² (P = V² / R).' },
    ],
  },
  {
    id: 'exp4',
    number: 'Experiment 04',
    title: 'Conductor Sizing, AWG Analysis & Voltage Drop Estimation',
    labPath: '/labs/wire-cable',
    aim: 'To determine the conductor cross-sectional area and estimate voltage drop across extended branch circuit cable runs.',
    apparatus: 'AWG Calibration Gauge, Micrometer, Lab 04 Sizing Simulator.',
    theory: 'All metallic conductors exhibit internal resistance proportional to their length and inversely proportional to their cross-sectional area (R = ρ × L / A). In long cable runs, resistance causes voltage drop (ΔV = 2 × I × R), which reduces equipment operating voltage and produces heat. Standards dictate voltage drop should not exceed 3% for branch circuits.',
    formula: 'ΔV = 2 × L × I × ρ / A | A_required = 2 × L × I × ρ / ΔV_allowed',
    procedure: [
      'Identify the nominal system voltage, load current, and one-way distance in meters.',
      'Establish the allowable voltage drop limit (typically 3% for critical loads, 5% max).',
      'Select conductor material: Copper (ρ = 1.72×10⁻⁸ Ω·m) or Aluminium (ρ = 2.82×10⁻⁸ Ω·m).',
      'Calculate minimum conductor cross-sectional area in mm² using the two-way loop formula.',
      'Convert mm² to the nearest commercially available AWG gauge using Lab 04.',
    ],
    viva: [
      { q: 'Why is the length multiplied by 2 in DC and single-phase cable sizing?', a: 'Because the current flows along the supply conductor and returns through the return/neutral conductor, doubling the path length.' },
      { q: 'What is the impact of an undersized cable in an electrical circuit?', a: 'Excessive voltage drop causing equipment malfunction, increased resistive heat, and potential insulation breakdown or electrical fire.' },
    ],
  },
  {
    id: 'exp5',
    number: 'Experiment 05',
    title: 'Single-Phase & Three-Phase AC Power and Power Factor',
    labPath: '/labs/power',
    aim: 'To evaluate Active Power (P), Reactive Power (Q), and Apparent Power (S) in balanced Single-Phase and Three-Phase electrical loads.',
    apparatus: 'Three-Phase Wattmeter, Power Quality Analyzer, Lab 05 Simulation Workbench.',
    theory: 'In AC circuits containing inductive or capacitive loads, current and voltage are out of phase by angle φ. Active Power (kW) represents useful mechanical or thermal work. Reactive Power (kvar) sustains electromagnetic fields in motors and transformers. Apparent Power (kVA) represents total grid loading. Power Factor (cos φ) measures the ratio of active to apparent power.',
    formula: '1-Phase: P = V × I × cos(φ) | 3-Phase: P = √3 × V_LL × I_L × cos(φ) | S = √(P² + Q²)',
    procedure: [
      'Select grid phase topology (Single-Phase AC or Three-Phase balanced load).',
      'Input the line-to-line RMS voltage and line current in amperes.',
      'Specify the load power factor (cos φ) and conversion efficiency.',
      'Compute real active power in watts and apparent power in volt-amperes.',
      'Verify reactive power and output mechanical horsepower in Lab 05.',
    ],
    viva: [
      { q: 'What is the difference between active and reactive power?', a: 'Active power performs real work (thermal, mechanical, optical). Reactive power oscillates back and forth to sustain magnetic fields without net energy transfer.' },
      { q: 'Why do utilities penalize industrial customers with low power factors?', a: 'A low power factor forces the utility to deliver higher current (increasing distribution losses and line heating) for the same amount of useful active power.' },
    ],
  },
  {
    id: 'exp6',
    number: 'Experiment 06',
    title: 'Engineering Unit Standardization & SI Prefix Conversions',
    labPath: '/labs/unit-converter',
    aim: 'To practice standard scientific SI metric and imperial electrical conversions across voltage, current, power, length, and wire sizes.',
    apparatus: 'SI Reference Chart, Unit Conversion Workbench (Lab 06).',
    theory: 'Electrical engineering relies on standard SI prefixes spanning 12 orders of magnitude (from pico 10⁻¹² in high-frequency capacitors to giga 10⁹ in utility grid generation). Mastering unit conversions prevents catastrophic design errors.',
    formula: 'Value_target = (Value_source × Factor_source) / Factor_target',
    procedure: [
      'Select the target physical domain (Electrical, Length, Wire).',
      'Convert base units into desired multiples (e.g. 500 mA to A, 1.2 kV to V).',
      'Convert between imperial mil (0.001 inch) and metric millimeters for PCB trace dimensions.',
      'Verify with the conversion workbench in Lab 06.',
    ],
    viva: [
      { q: 'How many microamperes (μA) are in 2.5 milliamperes (mA)?', a: '2.5 mA = 2,500 μA (since 1 mA = 1,000 μA).' },
      { q: 'What is 1 horsepower in electrical watts?', a: '1 hp = 745.7 Watts.' },
    ],
  },
  {
    id: 'exp7',
    number: 'Experiment 07',
    title: 'Standalone Solar PV Array & Battery Energy Storage Sizing',
    labPath: '/labs/solar-battery',
    aim: 'To calculate battery bank autonomy hours and size photovoltaic solar panel arrays for off-grid power systems.',
    apparatus: 'Solar PV Sizing Simulator (Lab 07), Solar Radiation Atlas.',
    theory: 'A standalone solar energy storage system requires sizing two distinct subsystems: the battery bank (which stores energy to supply continuous loads through nights and cloudy periods) and the photovoltaic array (which must harvest sufficient watt-hours during peak sun hours to both power daytime loads and recharge the battery bank).',
    formula: 'Backup Hours = (V_batt × Ah_batt × DoD × η_inv) / P_load | Array Watts = Daily_Wh / (PSH × BOS_efficiency)',
    procedure: [
      'Determine continuous load in watts and calculate total daily energy demand in Wh/day.',
      'Specify battery bank voltage and capacity in Ah; apply Depth of Discharge (DoD) to protect battery life.',
      'Calculate backup hours under continuous load using Lab 07.',
      'Determine local Peak Sun Hours (PSH) and calculate the required solar array peak wattage.',
      'Determine the count of commercial solar modules needed.',
    ],
    viva: [
      { q: 'Why is Depth of Discharge (DoD) limited in lead-acid batteries?', a: 'Discharging lead-acid batteries beyond 50% severely damages the plate chemistry and causes rapid sulfation, drastically shortening cycle life.' },
      { q: 'What is a "Peak Sun Hour" (PSH)?', a: 'It is the equivalent number of hours per day when solar irradiance averages 1,000 W/m².' },
    ],
  },
  {
    id: 'exp8',
    number: 'Experiment 08',
    title: 'Electrical Laboratory Safety, Lockout/Tagout & First Aid',
    labPath: '/labs/safety',
    aim: 'To master standard laboratory electrical safety protocols, PPE inspection, isolation procedures, and emergency response to electrical shock.',
    apparatus: 'Insulated Tools, Multimeter with CAT III rating, Lockout/Tagout Kit, Lab 08 Safety Guide.',
    theory: 'Electrical current passing through the human body above 10 mA causes painful muscle contractions; currents between 50-100 mA can trigger ventricular fibrillation and cardiac arrest. Safety protocol requires systematic isolation (Lockout/Tagout), the use of calibrated Personal Protective Equipment (PPE), and adherence to the "one-hand rule" when probing live terminals.',
    formula: 'I_body = V_applied / R_body (Wet human skin resistance can drop to ~1,000 Ω)',
    procedure: [
      'Verify that all test equipment has adequate CAT II / CAT III safety ratings.',
      'De-energize and lock out all circuit breakers before touching terminals.',
      'Use a calibrated voltmeter to verify isolation ("Test-Before-Touch" procedure).',
      'Maintain dry hands and clean, dry floor conditions.',
      'Review and complete the interactive safety acknowledgment in Lab 08.',
    ],
    viva: [
      { q: 'What is the "one-hand rule" in electrical testing?', a: 'Keeping one hand in your pocket or behind your back prevents completing a circuit path across the chest and heart in case of accidental contact.' },
      { q: 'What type of fire extinguisher must be used for energized electrical fires?', a: 'Class C (US) or Class E (international), typically Carbon Dioxide (CO₂) or Dry Chemical extinguishers. Never use water.' },
    ],
  },
];

export default function LabManualPage() {
  const [activeExp, setActiveExp] = useState('exp1');
  const [search, setSearch] = useState('');

  const currentExperiment = EXPERIMENTS.find((e) => e.id === activeExp) || EXPERIMENTS[0];

  const filteredExperiments = EXPERIMENTS.filter((e) =>
    `${e.number} ${e.title} ${e.aim} ${e.theory}`.toLowerCase().includes(search.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-linear-to-r from-emerald-500/10 via-teal-500/5 to-transparent p-6 sm:p-10 dark:border-slate-800 dark:from-emerald-950/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Official Laboratory Manual</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Electrical Engineering Lab Manual
            </h1>
            <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Standard laboratory instructions, theoretical principles, step-by-step procedures, formula sheets, and viva-voce questions for all 8 experiments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:border-emerald-500 hover:text-emerald-600 shadow-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Manual</span>
            </button>
            <Link
              to="/labs"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-500"
            >
              <span>Launch All Labs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Sidebar: Experiments Index (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search experiments..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-9 pr-3 py-2 text-xs text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>

            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredExperiments.map((exp) => (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setActiveExp(exp.id)}
                  className={`w-full text-left rounded-xl p-3 transition-all ${
                    activeExp === exp.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${
                    activeExp === exp.id ? 'text-emerald-100' : 'text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {exp.number}
                  </div>
                  <div className="text-xs font-bold mt-0.5 line-clamp-1">
                    {exp.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content: Experiment Detail (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-8">
            {/* Experiment Title Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {currentExperiment.number}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  {currentExperiment.title}
                </h2>
              </div>
              <Link
                to={currentExperiment.labPath}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-500 shrink-0"
              >
                <span>Launch Simulator</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 1. Aim / Objective */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                1. Objective & Aim
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                {currentExperiment.aim}
              </p>
            </div>

            {/* 2. Apparatus Required */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                2. Apparatus & Virtual Instruments
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentExperiment.apparatus}
              </p>
            </div>

            {/* 3. Theory & Formula */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                3. Theoretical Background & Physics
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentExperiment.theory}
              </p>
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/40 p-4 dark:border-emerald-500/10 dark:bg-emerald-950/20">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                  Governing Mathematical Equations
                </span>
                <code className="text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-white">
                  {currentExperiment.formula}
                </code>
              </div>
            </div>

            {/* 4. Step-by-Step Procedure */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                4. Experimental Procedure
              </h3>
              <ol className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {currentExperiment.procedure.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* 5. Viva-Voce Questions */}
            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  5. Viva-Voce Oral Exam Questions & Answers
                </h3>
              </div>
              <div className="space-y-3">
                {currentExperiment.viva.map((v, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60 space-y-1.5"
                  >
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Q{idx + 1}: {v.q}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong className="text-emerald-600 dark:text-emerald-400">Ans: </strong>
                      {v.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch simulation banner */}
            <div className="rounded-2xl bg-slate-950 p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold">Conduct This Experiment Live</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Launch the interactive simulation for {currentExperiment.title}.
                </p>
              </div>
              <Link
                to={currentExperiment.labPath}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors shrink-0"
              >
                <span>Open Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
