export const RESISTOR_COLOURS = {
  black: { value: 0, multiplier: 1, tolerance: null, tempCoeff: null },
  brown: { value: 1, multiplier: 10, tolerance: 1, tempCoeff: 100 },
  red: { value: 2, multiplier: 100, tolerance: 2, tempCoeff: 50 },
  orange: { value: 3, multiplier: 1000, tolerance: 0.05, tempCoeff: 15 },
  yellow: { value: 4, multiplier: 10000, tolerance: 0.02, tempCoeff: 25 },
  green: { value: 5, multiplier: 100000, tolerance: 0.5, tempCoeff: null },
  blue: { value: 6, multiplier: 1000000, tolerance: 0.25, tempCoeff: 10 },
  violet: { value: 7, multiplier: 10000000, tolerance: 0.1, tempCoeff: 5 },
  grey: { value: 8, multiplier: 100000000, tolerance: 0.05, tempCoeff: null },
  white: { value: 9, multiplier: 1000000000, tolerance: null, tempCoeff: null },
  gold: { value: null, multiplier: 0.1, tolerance: 5, tempCoeff: null },
  silver: { value: null, multiplier: 0.01, tolerance: 10, tempCoeff: null },
};

export const RESISTOR_COLOUR_NAMES = Object.keys(RESISTOR_COLOURS);

export function decodeResistor({ bandMode = '4', colours = [] }) {
  if (!['4', '5'].includes(String(bandMode))) {
    return { ok: false, error: 'Band mode must be 4 or 5.' };
  }

  const requiredBands = Number(bandMode);
  if (!Array.isArray(colours) || colours.length !== requiredBands) {
    return { ok: false, error: `Select ${requiredBands} valid band colours.` };
  }

  const bandValues = colours.map((colour) => {
    const info = RESISTOR_COLOURS[colour];
    if (!info) {
      return null;
    }
    return info;
  });

  if (bandValues.some((value) => value === null)) {
    return { ok: false, error: 'One or more band colours are invalid.' };
  }

  const digits = colours.slice(0, requiredBands - 2).map((colour) => RESISTOR_COLOURS[colour].value);
  if (digits.some((value) => value === null)) {
    return { ok: false, error: 'Digit bands must be numeric colours.' };
  }

  const multiplier = RESISTOR_COLOURS[colours[requiredBands - 2]].multiplier;
  const toleranceValue = RESISTOR_COLOURS[colours[requiredBands - 1]].tolerance;

  if (multiplier === undefined || multiplier === null) {
    return { ok: false, error: 'Multiplier band must be a valid multiplier colour.' };
  }

  if (toleranceValue === undefined || toleranceValue === null) {
    return { ok: false, error: 'Tolerance band must be a valid tolerance colour.' };
  }

  const significantDigits = Number(digits.join(''));
  const nominalOhms = significantDigits * multiplier;
  const minOhms = nominalOhms * (1 - toleranceValue / 100);
  const maxOhms = nominalOhms * (1 + toleranceValue / 100);

  const formatOhms = (value) => {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(3)} MΩ`;
    if (value >= 1000) return `${(value / 1000).toFixed(3)} kΩ`;
    if (value >= 1) return `${value.toFixed(2)} Ω`;
    return `${value.toFixed(4)} Ω`;
  };

  return {
    ok: true,
    bandMode: requiredBands,
    nominalOhms,
    tolerancePercent: toleranceValue,
    minOhms,
    maxOhms,
    nominalText: formatOhms(nominalOhms),
    minText: formatOhms(minOhms),
    maxText: formatOhms(maxOhms),
    formula: `${significantDigits} × ${multiplier} Ω = ${nominalOhms.toFixed(2)} Ω`,
    decodedBands: colours.map((colour, index) => `${index + 1}: ${colour}`).join(', '),
    bandLabels: [
      `Band 1: ${colours[0]}`,
      `Band 2: ${colours[1]}`,
      requiredBands === 5 ? `Band 3: ${colours[2]}` : null,
      `Multiplier: ${colours[requiredBands - 2]}`,
      `Tolerance: ${colours[requiredBands - 1]}`,
    ].filter(Boolean),
  };
}
