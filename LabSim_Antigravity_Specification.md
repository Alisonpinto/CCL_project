# LabSim — Antigravity Implementation Specification
## Web-Based Electrical Engineer’s Toolkit Platform

**Document purpose:** This file is the primary implementation brief for Antigravity IDE. Read it before making changes, then implement the project in small, testable stages. Treat the problem statement’s eight required tools as mandatory acceptance criteria. Extra features are welcome only after the required tools work accurately.

**Project name:** LabSim  
**Project directory:** `labsumulation_hack` (confirm the actual current folder before running commands)  
**Team:** Vasanth, Glenn, Aiden, Alison Pinto  
**Primary goal:** Build a responsive, accessible, reliable, browser-based electrical engineering toolkit for students and professionals.

---

# 1. Instructions for Antigravity

You are working as a senior frontend engineer, electrical-calculation reviewer, UI/UX designer, and QA engineer.

1. Inspect the existing repository before editing. Preserve working functionality and existing project conventions wherever possible.
2. Do not replace the project with a generic template or delete existing features without a clear reason.
3. Use the required stack already planned for LabSim: **React + Vite, JavaScript, Tailwind CSS, Lucide React, and React Router**. The required problem statement says HTML5, CSS3, and JavaScript; React/Vite is the chosen implementation approach and still uses these web technologies.
4. The application must work client-side without requiring an API key, backend, login, or paid service.
5. Every calculator must perform real calculations. Do not create buttons that do nothing, placeholder results, hardcoded outputs, or decorative-only controls.
6. Use SI units internally wherever practical. Convert units explicitly at input/output boundaries.
7. Keep calculation logic separate from UI components and test the calculation functions independently.
8. Clearly state assumptions, input units, output units, and limitations. Never imply an estimated cable size is a final installation design.
9. Handle invalid inputs safely: blank values, non-numeric values, zero where invalid, negative values where invalid, and unrealistic values.
10. Avoid silent defaults that could make results misleading. If a default value is supplied, show it clearly and let the user change it.
11. Implement responsive desktop, tablet, and mobile layouts, plus keyboard accessibility.
12. Run the available build, lint, and test commands. Fix errors before claiming completion.
13. Do not claim a feature is implemented until it has been tested.
14. If a technical requirement is ambiguous, choose a safe, clearly documented assumption and make it visible in the UI or documentation.
15. First provide a short repository audit and implementation plan, then implement the project. Continue beyond planning unless a genuine blocker requires user input.

---

# 2. Product Overview

LabSim is a digital electrical engineering laboratory. It combines commonly used electrical calculators, reference tools, safety guidance, and optional interactive learning simulations in one cohesive interface.

## Product principles

- **Accuracy first:** formula correctness and clear assumptions take priority over visual effects.
- **Learn by experimenting:** users can change inputs and immediately understand how results change.
- **Transparent calculations:** show formulas, substitutions, units, and explanations where useful.
- **Safety conscious:** distinguish educational estimates from professional installation advice.
- **Easy to use:** a user should be able to find a tool quickly and use it without reading a long manual.
- **Responsive:** core tools must be usable on phones as well as desktops.
- **Consistent:** all tools use shared cards, form controls, result panels, error states, and unit formatting.
- **Privacy friendly:** calculator data should remain in the browser. Do not send user inputs to a server.

## Primary users

- Electrical and electronics engineering students
- Engineering educators
- Hobbyists and makers
- Technicians and engineers who need quick reference calculations

## Scope priorities

### Priority 0 — required for acceptance
1. Resistor colour-code calculator (4-band and 5-band)
2. SMD resistor code calculator
3. Ohm’s law electrical calculator
4. Wire gauge conversion and cable-size estimation
5. Single-phase and three-phase power calculator
6. Electrical and length unit converter
7. Solar and battery backup calculator
8. Electrical safety guide with Do’s and Don’ts

### Priority 1 — high-value improvements
- Dashboard with all tools and search
- Formula and step-by-step explanations
- Input validation and useful error messages
- Copy result and reset buttons
- Dark/light theme
- Recent calculations stored locally, with a clear-history option
- Responsive mobile navigation
- Print-friendly result/report view
- Tooltips and an engineering glossary

### Priority 2 — optional LabSim differentiators
- Interactive circuit sandbox
- Logic gate playground
- Oscilloscope / waveform visualizer
- Capacitor code calculator
- Solar production scenario comparison
- Downloadable calculation summary
- Learning examples and sample values

Complete and validate Priority 0 before spending time on optional simulations.

---

# 3. Technology and Architecture

## Required stack

- **HTML5**
- **CSS3**
- **JavaScript**
- **React**
- **Vite**
- **Tailwind CSS**
- **Lucide React** for icons
- **React Router** for page navigation

Use the repository’s existing compatible versions where possible. Do not upgrade dependencies unnecessarily.

## Suggested architecture

Adapt this structure to the actual project; do not force a restructure if a sound structure already exists.

```text
labsumulation_hack/
├── public/
│   ├── favicon.svg
│   └── assets/
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   └── router.jsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── MobileNav.jsx
│   │   ├── common/
│   │   │   ├── ToolCard.jsx
│   │   │   ├── NumberField.jsx
│   │   │   ├── SelectField.jsx
│   │   │   ├── ResultPanel.jsx
│   │   │   ├── FormulaPanel.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   └── ConfirmDialog.jsx
│   │   └── visualizations/
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── ResistorCalculator.jsx
│   │   ├── SMDCalculator.jsx
│   │   ├── OhmsLawCalculator.jsx
│   │   ├── WireCableCalculator.jsx
│   │   ├── PowerCalculator.jsx
│   │   ├── UnitConverter.jsx
│   │   ├── SolarBatteryCalculator.jsx
│   │   ├── ElectricalSafety.jsx
│   │   ├── NotFound.jsx
│   │   └── About.jsx
│   ├── features/
│   │   ├── resistor/
│   │   ├── smd/
│   │   ├── ohms-law/
│   │   ├── wire-cable/
│   │   ├── power/
│   │   ├── converter/
│   │   ├── solar-battery/
│   │   └── safety/
│   ├── lib/
│   │   ├── calculations/
│   │   │   ├── resistor.js
│   │   │   ├── smd.js
│   │   │   ├── ohmsLaw.js
│   │   │   ├── wireCable.js
│   │   │   ├── power.js
│   │   │   ├── units.js
│   │   │   └── solarBattery.js
│   │   ├── formatters.js
│   │   ├── validation.js
│   │   └── storage.js
│   ├── hooks/
│   │   ├── useTheme.js
│   │   └── useRecentCalculations.js
│   ├── data/
│   │   ├── resistorColors.js
│   │   ├── wireGauge.js
│   │   └── safetyGuidance.js
│   ├── styles/
│   │   └── index.css
│   ├── main.jsx
│   └── index.css
├── tests/
├── README.md
├── package.json
└── vite.config.js
```

## Architecture rules

- Keep formula implementations in `src/lib/calculations/`.
- Keep reference tables in `src/data/`.
- Components should call calculation functions rather than reimplement formulas.
- Use reusable controlled form fields with labels and units.
- Use React Router routes for each tool.
- Keep dependencies small; do not install a large charting or state-management library unless there is a clear need.
- Use `localStorage` only for preferences and explicitly opted-in recent calculations. Provide a way to clear saved history.
- No credentials, tokens, or secrets should be added to the repository.

---

# 4. UI/UX Direction

## Visual identity

Create a polished engineering dashboard: precise, modern, technical, uncluttered, and readable. Use a **dark-first black/charcoal and blue visual identity**, with a complete light theme as an option. Avoid neon colours and avoid using green as the main brand colour.

Suggested visual direction:
- Main dark background: near-black / charcoal
- Surfaces: slightly lighter charcoal with clear separation
- Primary accent: blue
- Secondary text: muted grey
- Borders: subtle, high contrast where needed
- Status colours: use sparingly and always pair with text or an icon
- Typography: clean sans-serif with strong heading hierarchy
- Cards: restrained radius, consistent padding, subtle borders
- Avoid excessive gradients, glowing effects, huge empty hero areas, and unnecessary animation.

Define colours through CSS variables or Tailwind theme tokens so dark/light themes stay consistent. Do not hardcode unrelated colours throughout components.

## Main layout

### Desktop
- Persistent left sidebar or compact navigation rail
- Top header with LabSim branding, global search, theme toggle, and mobile-safe controls
- Main content area with clear page title, short description, and tool workspace
- Optional right-side formula/help panel only where it adds value

### Mobile
- Collapsible navigation or accessible drawer
- Single-column forms and results
- No horizontal page overflow
- Inputs and buttons large enough for touch
- Tables become scrollable or transform into readable cards
- Sidebar closes after route selection

## Dashboard requirements

The dashboard should contain:
1. Welcome heading and a concise explanation of LabSim
2. Search field to find tools by name or keyword
3. Tool cards for all eight required tools
4. A “Quick calculations” or “Frequently used” section
5. Recently used tools or recent calculations, if local history is implemented
6. Small “How to use LabSim” or safety disclaimer section
7. Clear navigation and visible focus states

Each tool card should include:
- Tool name
- One-sentence description
- Relevant icon
- Short indication of what it calculates
- A clear action such as “Open tool”
- Entire card should not be a misleading button if it contains nested interactive controls.

## Shared calculator interaction pattern

Every calculator should consistently provide:
- Page title and short description
- Input area with explicit units
- Mode selector where relevant
- Inline validation
- A clearly distinguished result area
- Formula and calculation steps
- Copy result action
- Reset/clear action
- Helpful example or “Try sample values”
- Notes and assumptions
- Accessible loading/empty/error states, even if calculation is instantaneous

For instant calculators, recalculate when inputs change only when this does not create confusing intermediate errors. Otherwise use a Calculate button. Do not show stale results after invalid input.

---

# 5. Required Feature Specifications

## 5.1 Resistor Colour-Code Calculator

### Purpose
Decode standard 4-band and 5-band through-hole resistor colour codes.

### Inputs
- Band configuration: 4-band or 5-band
- A colour selector for each band
- Optional direction/reading hint
- A reset button

### Colour data and rules

Digit colours:
- Black = 0
- Brown = 1
- Red = 2
- Orange = 3
- Yellow = 4
- Green = 5
- Blue = 6
- Violet = 7
- Grey = 8
- White = 9

Multiplier:
- Black = ×1
- Brown = ×10
- Red = ×100
- Orange = ×1,000
- Yellow = ×10,000
- Green = ×100,000
- Blue = ×1,000,000
- Violet = ×10,000,000
- Grey = ×100,000,000
- White = ×1,000,000,000
- Gold = ×0.1
- Silver = ×0.01

Tolerance:
- Brown = ±1%
- Red = ±2%
- Green = ±0.5%
- Blue = ±0.25%
- Violet = ±0.1%
- Grey = ±0.05%
- Gold = ±5%
- Silver = ±10%
- No band = ±20% (only when applicable to the supported resistor convention)

Temperature coefficient (5-band, where applicable):
- Brown = 100 ppm/°C
- Red = 50 ppm/°C
- Orange = 15 ppm/°C
- Yellow = 25 ppm/°C
- Blue = 10 ppm/°C
- Violet = 5 ppm/°C

Implement a clearly documented, standards-aware table. Not every colour is valid in every band role; the UI should filter invalid choices or explain them.

### Calculation rules
- 4-band: first digit, second digit, multiplier, tolerance.
- 5-band: first digit, second digit, third digit, multiplier, tolerance.
- Resistance = significant digits × multiplier.
- Display resistance in a suitable unit: Ω, kΩ, or MΩ.
- Display tolerance range: nominal × (1 − tolerance) to nominal × (1 + tolerance).
- If a fifth band is being interpreted as tolerance, do not label it as a temperature coefficient. In 5-band conventional coding, the fifth band is tolerance; an optional sixth band may represent temperature coefficient. This project only requires 4-band and 5-band, so temperature coefficient should be informational or an optional future 6-band mode, not a fifth-band result.

### Visualisation
Show a resistor illustration with coloured bands that update when a colour is selected. Provide labels such as Band 1, Band 2, Multiplier, Tolerance. Ensure colours remain distinguishable for colour-vision deficiencies by also showing colour names.

### Results
- Nominal resistance
- Tolerance percentage
- Minimum and maximum resistance
- Human-readable decoded bands
- Formula / worked calculation

### Validation and edge cases
- Block invalid band combinations.
- Format very small and large values without confusing precision.
- Test gold and silver multipliers.
- Never show `NaN`, `Infinity`, or unexplained rounding.

---

## 5.2 SMD Resistor Code Calculator

### Purpose
Decode common numeric SMD resistor markings.

### Supported formats

**3-digit code**
- First two digits are significant digits.
- Third digit is the multiplier exponent.
- Example: `472` = 47 × 10² Ω = 4,700 Ω = 4.7 kΩ.

**4-digit code**
- First three digits are significant digits.
- Fourth digit is the multiplier exponent.
- Example: `1002` = 100 × 10² Ω = 10,000 Ω = 10 kΩ.

**R decimal notation**
- `4R7` = 4.7 Ω
- `R22` = 0.22 Ω
- `0R0` = 0 Ω

**EIA-96 code (recommended enhancement)**
- Support the two-digit EIA-96 number plus multiplier letter only if a verified EIA-96 lookup table is included and tested.
- Do not guess the EIA-96 mapping.
- If full EIA-96 support is not implemented, explicitly say which formats are supported and provide a friendly “unsupported/ambiguous marking” message.

### Inputs
- Code text field
- Format selector: Auto-detect, 3-digit, 4-digit, R notation, and EIA-96 only if implemented
- Decode button or live decode
- Clear button

### Results
- Resistance in Ω / kΩ / MΩ
- Parsed code and method used
- Worked explanation
- Special indication for zero-ohm jumper

### Validation
- Trim whitespace and normalise case.
- Reject unsupported characters and malformed codes.
- Do not silently parse a code that could have multiple interpretations.
- Include unit tests for examples above and invalid strings.

---

## 5.3 Electrical Calculator — Ohm’s Law

### Purpose
Calculate voltage (V), current (I), resistance (R), and power (P).

### Inputs and modes
Provide a mode selector so the user can choose which quantity to solve. Support all standard cases where two independent known quantities determine the remaining values. Do not pretend all four values can be independently inferred from only one known value.

Recommended modes:
- Voltage + Current → Resistance and Power
- Voltage + Resistance → Current and Power
- Current + Resistance → Voltage and Power
- Voltage + Power → Current and Resistance
- Current + Power → Voltage and Resistance
- Resistance + Power → Voltage and Current

Optionally offer a “Solve for” selector and allow users to enter the two known quantities.

### Formulas
- \(V = I R\)
- \(I = V / R\)
- \(R = V / I\)
- \(P = V I\)
- \(P = I^2 R\)
- \(P = V^2 / R\)

Use consistent SI units internally:
- Voltage: volts (V)
- Current: amperes (A)
- Resistance: ohms (Ω)
- Power: watts (W)

### Results
- All derived values
- Formula used
- Substitution with actual input values
- Unit-aware formatted values (mA, A, kΩ, W, mW, kW as appropriate)
- Optional simple educational circuit diagram or visual indicator

### Validation
- For division, denominator cannot be zero.
- Resistance must be positive for normal resistive calculations.
- Current and power must not be negative unless a future signed-power mode is explicitly documented.
- Do not silently assume AC power factor in this DC/Ohm’s law calculator.
- Use sufficient precision internally and round only for display.

---

## 5.4 Wire & Cable Calculator

### Purpose
Convert AWG wire sizes to cross-sectional area in mm² and provide an educational cable-size estimate based on user inputs.

### Part A — AWG conversion
- Select AWG size from a documented standard range (recommended 0000/4-0 through 40 AWG, represented consistently).
- Show approximate bare conductor diameter in mm.
- Show cross-sectional area in mm².
- Show an optional equivalent circular-mil value.
- Clearly identify copper or aluminium if material-specific calculations are provided.

Use the standard AWG relationship, not a hand-entered list of rounded guesses:
- Diameter in inches for AWG n: \(d = 0.005 \times 92^{(36-n)/39}\)
- Diameter in mm = inches × 25.4
- Area in mm² = \(\pi d^2 / 4\)

For 0 AWG and larger, implement a clear numeric representation for 00, 000, and 0000 or use their equivalent AWG labels consistently.

### Part B — Educational cable-size estimate
Inputs:
- Conductor material: copper or aluminium
- DC or single-phase AC (three-phase may be added)
- Supply voltage
- Load current OR power and power factor where relevant
- One-way cable length in metres
- Permissible voltage-drop percentage
- Optional ambient/installation notes, clearly marked as not enough to certify an installation

For a simple two-conductor DC circuit:
- Loop length = 2 × one-way length
- Approximate voltage drop: \(\Delta V = I \rho L_{\text{loop}} / A\)
- Required area: \(A = I \rho L_{\text{loop}} / \Delta V_{\text{allowed}}\)
- \(\Delta V_{\text{allowed}} = V_{\text{supply}} \times \text{allowed drop fraction}\)
- Use and document the chosen resistivity reference and temperature assumption.
- Copper resistivity at 20°C may be approximated as 0.01724 Ω·mm²/m.
- Aluminium resistivity at 20°C may be approximated as 0.0282 Ω·mm²/m.
- Explain that actual resistance rises with conductor temperature.

For AC circuits, voltage drop depends on installation conditions, conductor impedance, power factor, frequency, and wiring arrangement. Either implement a properly sourced/documented method or label the result as a simplified estimate. Do not reuse the DC equation while presenting it as a certified AC cable design.

### Results
- Calculated conductor area required by voltage-drop constraint
- Suggested next available nominal area from a maintained reference table
- Estimated voltage drop in volts and percent
- Estimated receiving-end voltage
- Assumptions, material, length, and calculation steps
- Prominent note: ampacity/current-carrying capacity is a separate constraint and must also be checked against applicable local codes and installation conditions.

### Safety and correctness
- Do not claim the estimated area alone determines a safe cable.
- Do not present one universal ampacity table as valid for all installation methods.
- Provide a link-free reference note to consult applicable national/local standards and a qualified electrician for real installations.
- Reject zero/negative length, voltage, current, area, and invalid drop percentages.
- Test common AWG sizes and monotonic behaviour (larger AWG number means smaller wire).

---

## 5.5 Power Calculator — Single-Phase and Three-Phase

### Purpose
Calculate electrical power for single-phase and balanced three-phase systems.

### Inputs
- System type: single-phase or three-phase
- Voltage convention: line-to-neutral or line-to-line where applicable
- Voltage in volts
- Current in amperes
- Power factor (0 to 1; greater than zero for calculations requiring division)
- Optional efficiency for input/output power estimation
- Solve mode: calculate real power, apparent power, reactive power, current, or power factor where mathematically possible

### Formulas

**Single-phase AC**
- Apparent power: \(S = V I\) (VA)
- Real power: \(P = V I \text{PF}\) (W)
- Reactive power magnitude: \(Q = V I \sqrt{1-\text{PF}^2}\) (var), under the usual sinusoidal assumptions

**Balanced three-phase AC using line-to-line voltage**
- Apparent power: \(S = \sqrt{3} V_{LL} I_L\) (VA)
- Real power: \(P = \sqrt{3} V_{LL} I_L \text{PF}\) (W)
- Reactive power magnitude: \(Q = \sqrt{3} V_{LL} I_L \sqrt{1-\text{PF}^2}\) (var), under the usual sinusoidal assumptions

**DC**
- \(P = V I\), without AC power factor.

If efficiency is supplied:
- Output power = input power × efficiency fraction.
- Input power = output power / efficiency fraction.
- Do not apply efficiency automatically to basic power results.

### Results
- Real power (W/kW)
- Apparent power (VA/kVA)
- Reactive power (var/kvar), where assumptions permit
- Formula used
- Clear label of phase/system and voltage convention
- Optional current required for a target power, when inputs are sufficient

### Validation and explanatory notes
- Power factor must be in (0, 1] for the simplified calculations above.
- For a balanced three-phase calculation, clearly state that the standard \(\sqrt{3}\) formula uses line-to-line voltage and line current.
- Do not confuse kW, kVA, and kvar.
- Explain that distorted waveforms and non-sinusoidal systems can require more advanced power definitions.

---

## 5.6 Unit Converter

### Purpose
Convert common electrical and length units accurately.

### Interface
- Category selector
- “From” value and unit
- “To” unit
- Swap units button
- Reset button
- Live conversion result
- Copy result button

### Required categories

**Electrical**
- Voltage: V, mV, kV
- Current: A, mA, µA, kA
- Resistance: Ω, mΩ, kΩ, MΩ
- Power: W, mW, kW, MW
- Energy: Wh, kWh, J, kJ, MJ
- Capacitance: F, mF, µF, nF, pF
- Frequency: Hz, kHz, MHz, GHz
- Charge: C, mC, µC
- Conductance: S, mS, µS
- Apparent power: VA, kVA, MVA
- Reactive power: var, kvar, Mvar

**Length**
- mm, cm, m, km
- inches, feet
- Optional miles

**Wire**
- AWG ↔ cross-sectional area in mm² through the AWG reference function; do not treat AWG as a linear unit conversion.

### Implementation requirements
- Store unit conversion factors centrally.
- Convert via a base unit to reduce errors.
- Avoid floating-point display noise such as `0.30000000004`.
- Use appropriate significant figures and scientific notation for very small/large values.
- Clearly distinguish energy from power.
- Do not include conversions between dimensions that are not physically equivalent.

### Validation
- Reject non-numeric values.
- Allow negative values only for quantities where signed values are meaningful and documented.
- Zero must convert correctly.
- Ensure the swap button swaps both units and updates the result.

---

## 5.7 Solar & Battery Calculator

### Purpose
Estimate battery backup duration and approximate solar panel requirements for a load.

### Mode selector
- Battery backup estimate
- Solar panel sizing
- Optional combined daily-energy planner

### Mode A — Battery backup

Inputs:
- Load power in watts (W)
- Battery voltage in volts (V)
- Battery capacity in amp-hours (Ah) OR watt-hours (Wh)
- Battery chemistry or allowed depth-of-discharge setting
- Inverter efficiency, if using an inverter
- Optional battery discharge/system efficiency
- Optional reserve margin

Formula:
- Nominal battery energy (Wh) = battery voltage × capacity (Ah)
- Usable energy (Wh) = nominal energy × allowed depth-of-discharge fraction
- Delivered load energy (Wh) = usable energy × applicable inverter/system efficiency
- Estimated backup time (hours) = delivered load energy / load power

Use the selected chemistry’s documented default depth of discharge only as a starting assumption. Let users edit the assumption. Do not claim one depth-of-discharge percentage is correct for every battery.

### Mode B — Solar panel sizing

Inputs:
- Daily energy consumption (Wh/day or kWh/day)
- Peak sun hours per day
- Overall system efficiency factor or loss percentage
- Desired system voltage as optional context
- Optional panel rating and number of panels for a production estimate
- Optional days/monthly season note

Formula:
- Required array power (W) = daily energy demand (Wh/day) / (peak sun hours × overall efficiency fraction)
- Estimated daily generation (Wh/day) = array power (W) × peak sun hours × overall efficiency fraction
- Number of panels = ceiling(required array power / individual panel rating), when panel rating is supplied

### Combined planner (optional)
Allow the user to list a few loads, each with name, quantity, watts, and hours/day. Compute:
- Daily energy per load = quantity × watts × hours/day
- Total daily energy = sum of all loads
- Approximate required solar array size
- Approximate battery energy for a selected autonomy duration

### Results
- Nominal battery energy
- Estimated usable energy
- Estimated backup hours/minutes
- Required solar array power in W/kW
- Estimated daily generation
- Suggested panel count if panel rating is known
- A breakdown of formulas and assumptions

### Validation and caveats
- Load power, battery voltage/capacity, and peak sun hours must be positive.
- Efficiency fractions must be greater than zero and no more than one.
- Depth of discharge must be greater than zero and no more than one, with warnings for potentially unsuitable values.
- Explain that real results vary due to temperature, ageing, discharge rate, shading, orientation, seasonal sunlight, controller/inverter losses, and local conditions.
- Do not promise that an estimated system will work for a particular property without a proper load and site assessment.

---

## 5.8 Electrical Safety Guide

### Purpose
Present essential electrical safety Do’s and Don’ts in a readable, searchable format.

### Content groups
1. General electrical safety
2. Working around household wiring
3. Lab and educational circuit safety
4. Battery and DC power safety
5. Solar and inverter safety
6. Wet environments
7. Damaged cables, plugs, and equipment
8. Emergency response

### Required Do’s
- Switch off and isolate power before inspection or maintenance.
- Verify isolation using suitable, properly rated test equipment.
- Use correctly rated, undamaged tools and protective equipment.
- Keep hands and work areas dry and keep electrical equipment away from water.
- Inspect cables, plugs, and insulation before use.
- Use suitable overcurrent protection and properly rated wiring.
- Follow manufacturer instructions and applicable electrical codes.
- Ask a qualified electrician to perform work beyond your training or legal authorization.
- Keep children and untrained people away from exposed electrical parts.
- For laboratory circuits, start with a current-limited low-voltage supply when appropriate.

### Required Don’ts
- Never touch exposed live conductors.
- Never work on energized mains circuits as an unqualified person.
- Never bypass fuses, circuit breakers, earth connections, or safety interlocks.
- Never use damaged cables, loose connections, or improvised conductors.
- Never overload outlets, extension boards, or cables.
- Never handle electrical equipment with wet hands or in standing water.
- Never assume a circuit is safe merely because a switch is off.
- Never use an ordinary multimeter or probe outside its voltage/category rating.
- Never short a battery to test it; batteries can deliver dangerous fault currents.
- Never approach fallen power lines.

### Emergency guidance
- If a person may be in contact with electricity, do not touch them directly while the source may still be live.
- Disconnect power only if it is safe to do so. Call local emergency services and follow trained emergency guidance.
- For electrical fires, do not throw water on energized equipment. Evacuate and contact emergency services.
- If a battery is swelling, smoking, leaking, or overheating, move away, avoid handling it, and follow the manufacturer’s emergency instructions and local emergency guidance.

### UI requirements
- Searchable safety cards
- Clear Do / Don’t labels
- Filters by topic
- Emergency guidance visually prominent without relying on colour alone
- Optional “I’ve read this” acknowledgement; it must not imply certification
- A disclaimer that the page is educational and does not replace professional training, local codes, or emergency services

Do not provide risky instructions that encourage an untrained user to work on live mains systems.

---

# 6. Shared Functional Requirements

## Global search
- Search tool names and descriptive keywords.
- Show matching tools as the user types.
- Support keyboard navigation and Enter to open a result.
- Show a helpful empty state when nothing matches.
- Do not search private user data or transmit queries externally.

## Copy result
- Copy the result with the relevant unit and a concise formula/assumption summary.
- Give accessible success/failure feedback.
- Avoid claiming the copy succeeded if the browser rejects the operation.

## Reset
- Reset inputs to the documented initial state.
- Clear calculated output and validation errors.
- Confirm before clearing all saved history, not before resetting one calculator.

## Recent calculations (optional but recommended)
- Store a small history locally, with timestamp, tool name, inputs, outputs, and assumptions.
- Do not store unnecessary personal data.
- Provide “Clear history”.
- Handle invalid or outdated localStorage data without crashing.
- Consider allowing history to be disabled.

## Theme
- Dark and light modes
- Persist preference locally
- Respect system preference on first visit if no preference exists
- Ensure accessible contrast in both themes
- Theme toggle must have a descriptive accessible label

## Accessibility
- Semantic HTML landmarks
- One clear page-level heading
- Every input has a visible label
- Units are visible beside values
- Keyboard-operable controls and navigation
- Visible focus indicator
- Correct accessible names for icon-only buttons
- Errors announced appropriately and connected to their fields
- Do not communicate results or warnings by colour alone
- Respect reduced-motion preferences
- Maintain readable contrast and text sizes

## Performance
- Keep initial load fast.
- Avoid unnecessary dependencies and huge bundled assets.
- Avoid unnecessary re-renders.
- Use lazy loading for pages if it materially improves startup time.
- No heavy animation that interferes with calculation or accessibility.

---

# 7. Calculation Quality and Engineering Rules

1. Put all formulas in pure JavaScript functions with documented input/output units.
2. Keep internal calculations at full floating-point precision; round only for display.
3. Use a shared formatter for resistance, current, voltage, power, energy, length, and time.
4. Explicitly distinguish exact conversions from engineering estimates.
5. Display assumptions close to the output, not hidden in a separate page.
6. Use verified reference tables where a table is required.
7. Never fabricate standards, ampacity ratings, EIA-96 codes, or code-compliance claims.
8. Use clear names such as `lineToLineVoltageV`, `currentA`, `resistanceOhms`, and `dailyEnergyWh`.
9. Validate values before calculations. Return structured errors or clear validation messages rather than allowing invalid numeric states to propagate.
10. If an input changes, clear or recompute results so old values are not mistaken for current ones.
11. Explain that actual electrical installations must be designed or verified using applicable local regulations and qualified professionals.
12. Use appropriate units in the result and in any copied output.

---

# 8. Testing and Acceptance Criteria

Antigravity must create and run automated tests for calculation functions. Use the test framework already present; if none exists, add a lightweight setup compatible with the project, such as Vitest.

## Required calculation tests

### Resistor colour code
- 4-band: Brown, Black, Red, Gold → 1 kΩ ±5%; range 950–1050 Ω.
- 4-band: Yellow, Violet, Orange, Gold → 47 kΩ ±5%.
- 5-band: Brown, Black, Black, Red, Brown → 10 kΩ ±1%.
- Gold and silver multipliers decode correctly.
- Invalid band choices produce a clear validation result.

### SMD code
- `472` → 4.7 kΩ.
- `1002` → 10 kΩ.
- `4R7` → 4.7 Ω.
- `R22` → 0.22 Ω.
- `0R0` → 0 Ω.
- Malformed codes are rejected.
- EIA-96 examples are tested against a verified reference table if implemented.

### Ohm’s law
- 12 V across 6 Ω → 2 A and 24 W.
- 5 V and 0.5 A → 10 Ω and 2.5 W.
- Division by zero is rejected.
- Results are consistent across equivalent formula paths.

### AWG and cable estimate
- AWG 12 area is approximately 3.31 mm².
- AWG 10 area is approximately 5.26 mm².
- Larger AWG number produces smaller area.
- Doubling a simple DC circuit’s one-way length doubles its calculated voltage drop for the same current and conductor area.
- Zero length and invalid voltage-drop percentages are rejected.
- The UI clearly labels the result as an estimate and reminds users to check ampacity and code requirements.

### Power calculator
- Single-phase 230 V × 10 A × PF 0.8 → 1,840 W real power.
- Balanced three-phase 400 V line-to-line × 10 A × PF 0.8 → approximately 5,543 W real power.
- DC mode does not apply power factor.
- Invalid power factor is rejected.

### Unit converter
- 1 kV = 1,000 V.
- 1 A = 1,000 mA.
- 1 kΩ = 1,000 Ω.
- 1 kWh = 3.6 MJ.
- 1 inch = 25.4 mm.
- Swapping units returns the original quantity within expected numerical precision.

### Solar and battery
- 12 V × 100 Ah = 1,200 Wh nominal battery energy.
- With 80% allowed discharge and 90% inverter efficiency, usable delivered energy is 864 Wh.
- A 100 W load under those assumptions runs for approximately 8.64 hours.
- A 2,000 Wh/day demand with 5 peak-sun-hours and 80% overall system efficiency requires approximately 500 W of array power.
- Zero load and invalid efficiency values are rejected.

## UI acceptance checklist

- [ ] All eight required tools are reachable from the main navigation.
- [ ] Every required calculator computes results correctly.
- [ ] Results include appropriate units.
- [ ] Formula or explanation is shown where applicable.
- [ ] Invalid input never produces visible `NaN` or `Infinity`.
- [ ] Reset buttons work.
- [ ] Copy result works or gives a clear error.
- [ ] Dark and light modes both work if implemented.
- [ ] Layout works at mobile, tablet, and desktop widths.
- [ ] Keyboard navigation and visible focus states work.
- [ ] Safety guide contains the required Do’s and Don’ts.
- [ ] No dead buttons or placeholder calculations remain.
- [ ] Build passes.
- [ ] Automated calculation tests pass.
- [ ] Browser console has no avoidable runtime errors.

---

# 9. Recommended Implementation Sequence

Implement in this order. Keep each stage runnable.

## Stage 1 — Audit and foundation
- Inspect existing files, dependencies, and current UI.
- Report what already exists and what needs to be added.
- Confirm React/Vite/Tailwind/Router setup.
- Create a consistent app shell, routing, navigation, typography, and theme tokens.
- Make all eight tool pages accessible, even if built in stages.

## Stage 2 — Calculation engine and tests
- Implement pure calculation functions for resistor, SMD, Ohm’s law, AWG, power, unit conversions, and solar/battery calculations.
- Add tests for the acceptance examples in this document.
- Fix calculation tests before polishing calculator UI.

## Stage 3 — Required calculator interfaces
- Build the resistor and SMD tools.
- Build Ohm’s law and power calculators.
- Build AWG conversion and cable estimate.
- Build unit converter.
- Build solar and battery modes.
- Add formulas, validation, reset, copy, and result formatting.

## Stage 4 — Safety and learning support
- Build the searchable electrical safety guide.
- Add warnings and assumptions.
- Add useful examples and concise explanations.

## Stage 5 — Product polish
- Finish dashboard, global search, recent tools, theme persistence, mobile navigation, responsive states, empty states, and accessibility.
- Add optional features only after all required tools pass.

## Stage 6 — Verification and handoff
- Run tests, lint, and production build.
- Resolve all errors.
- Manually verify each required tool and common invalid-input cases.
- Update README with accurate installation and feature instructions.
- Provide a concise completion report: implemented features, test commands and results, known limitations, and any follow-up work.

---

# 10. Optional Features — Only After Required Criteria Pass

These are enhancements, not substitutes for the eight required features.

## Interactive circuit sandbox
- Allow users to place basic components such as DC source, resistor, switch, LED, and ground.
- Use clear connection points and prevent misleading connections.
- If a real circuit solver is not implemented, label the feature as a visual wiring sandbox rather than a physics-accurate simulator.
- Do not claim accurate current/voltage simulation without a validated circuit-solving engine.

## Logic gate playground
- AND, OR, NOT, NAND, NOR, XOR, XNOR
- Interactive input switches
- Live output and truth table
- Clear logic expressions

## Oscilloscope visualizer
- Generate educational sine, square, and triangle waves.
- Controls for amplitude, frequency, phase, and offset.
- Display a labelled time axis and voltage axis.
- Clearly label simulated signals as generated examples, not real instrument measurements.

## Capacitor code calculator
- Decode common capacitor markings only when the marking convention is known.
- Explain unit conversion and uncertainty.
- Provide validation and examples.

## Download / print report
- Provide a clean print stylesheet or a downloadable text/CSV report for selected calculation results.
- Include inputs, outputs, formulas, units, assumptions, and generation date.
- Do not include user data beyond what the user selected.

---

# 11. Documentation and Handoff

Update the project README to include:
- LabSim description and scope
- Feature list for the eight required tools
- Tech stack
- Prerequisites
- Installation and run instructions
- Test and production-build commands
- Calculation assumptions and limitations
- Team members: Vasanth, Glenn, Aiden, Alison Pinto
- Screenshots section if actual screenshots are available

Do not invent team roles or claim that a feature is complete if it is not.

At the end of implementation, provide:
1. A summary of features completed.
2. A list of key files created or modified.
3. Exact commands used to run tests and build.
4. Test/build results.
5. Known limitations and any features deliberately left for later.

---

# 12. Definition of Done

LabSim is ready for review only when:
- All eight required tools work.
- The formulas and conversions pass the defined tests.
- Inputs and outputs display correct units.
- Validation and safety disclaimers are present.
- The interface is responsive and accessible.
- No visible control is knowingly non-functional.
- The app starts using the documented commands.
- Automated tests pass and a production build succeeds.
- The README matches the actual implementation.

**Final instruction:** Prioritize a complete, correct, usable engineering toolkit over a flashy mock-up. Make every required feature functional, make calculations explainable, and be honest about assumptions and engineering limitations.
