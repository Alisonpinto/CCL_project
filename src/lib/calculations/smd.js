const SUPPORTED_FORMATS = ['3-digit', '4-digit', 'R notation'];

export function decodeSmdCode(rawValue, selectedFormat = 'auto') {
  if (typeof rawValue !== 'string') {
    return { ok: false, error: 'Enter a resistor code.' };
  }

  const value = rawValue.trim().toUpperCase();
  if (!value) {
    return { ok: false, error: 'Code cannot be empty.' };
  }

  if (value === '0R0') {
    return {
      ok: true,
      ohms: 0,
      method: 'R notation',
      explanation: 'Zero-ohm jumper detected.',
      nominalText: '0 Ω',
      raw: value,
    };
  }

  if (/^R\d*([.,]\d+)?$/i.test(value)) {
    const numeric = value.startsWith('R') ? Number(`0${value}`.replace('R', '.')) : Number(value);
    if (!Number.isFinite(numeric) || numeric < 0) {
      return { ok: false, error: 'Malformed R-notation resistor code.' };
    }

    return {
      ok: true,
      ohms: numeric,
      method: 'R notation',
      explanation: `${value} = ${numeric} Ω`,
      nominalText: `${numeric.toFixed(2).replace(/\.00$/, '')} Ω`,
      raw: value,
    };
  }

  if (/^[0-9]{3,4}$/.test(value)) {
    const digits = value.split('').map(Number);
    const significantDigits = digits.slice(0, value.length - 1).join('');
    const exponent = Number(digits[digits.length - 1]);
    const ohms = Number(significantDigits) * 10 ** exponent;
    return {
      ok: true,
      ohms,
      method: value.length === 3 ? '3-digit' : '4-digit',
      explanation: `${value} = ${Number(significantDigits)} × 10^${exponent} Ω = ${ohms} Ω`,
      nominalText: formatOhms(ohms),
      raw: value,
    };
  }

  if (/^\d*R\d+$/i.test(value)) {
    const match = value.match(/^(\d*\.?\d*)R(\d+)$/i);
    if (!match) {
      return { ok: false, error: 'Malformed R notation.' };
    }

    const [, whole, fractional] = match;
    const numeric = Number(`${whole || '0'}.${fractional || '0'}`);
    return {
      ok: true,
      ohms: numeric,
      method: 'R notation',
      explanation: `${value} = ${numeric} Ω`,
      nominalText: `${numeric.toFixed(2).replace(/\.00$/, '')} Ω`,
      raw: value,
    };
  }

  if (selectedFormat === 'eia-96' || /^(0[1-9]|[1-9][0-9])[A-Z]$/i.test(value)) {
    return {
      ok: false,
      error: 'EIA-96 support is not implemented in this build. Use 3-digit, 4-digit, or R notation values.',
    };
  }

  if (!/^[0-9R.]+$/i.test(value)) {
    return { ok: false, error: 'Unsupported characters found. Use digits and optional R notation only.' };
  }

  return { ok: false, error: `Unsupported or ambiguous SMD code. Supported formats: ${SUPPORTED_FORMATS.join(', ')}.` };
}

function formatOhms(value) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(3)} MΩ`;
  if (value >= 1000) return `${(value / 1000).toFixed(3)} kΩ`;
  if (value >= 1) return `${value.toFixed(2)} Ω`;
  return `${value.toFixed(3)} Ω`;
}

export const SMD_SUPPORTED_FORMATS = SUPPORTED_FORMATS;
