import { awgAreaMm2 } from './wireCable.js';

export const UNIT_CATEGORIES = {
  electrical: {
    V: { base: 1, label: 'Voltage', group: 'electrical' },
    mV: { base: 0.001, label: 'Voltage', group: 'electrical' },
    kV: { base: 1000, label: 'Voltage', group: 'electrical' },
    A: { base: 1, label: 'Current', group: 'electrical' },
    mA: { base: 0.001, label: 'Current', group: 'electrical' },
    uA: { base: 0.000001, label: 'Current', group: 'electrical' },
    kA: { base: 1000, label: 'Current', group: 'electrical' },
    'Ω': { base: 1, label: 'Resistance', group: 'electrical' },
    mΩ: { base: 0.001, label: 'Resistance', group: 'electrical' },
    kΩ: { base: 1000, label: 'Resistance', group: 'electrical' },
    MΩ: { base: 1000000, label: 'Resistance', group: 'electrical' },
    W: { base: 1, label: 'Power', group: 'electrical' },
    mW: { base: 0.001, label: 'Power', group: 'electrical' },
    kW: { base: 1000, label: 'Power', group: 'electrical' },
    MW: { base: 1000000, label: 'Power', group: 'electrical' },
    Wh: { base: 1, label: 'Energy', group: 'electrical' },
    kWh: { base: 3600000, label: 'Energy', group: 'electrical' },
    J: { base: 1, label: 'Energy', group: 'electrical' },
    kJ: { base: 1000, label: 'Energy', group: 'electrical' },
    MJ: { base: 1000000, label: 'Energy', group: 'electrical' },
    F: { base: 1, label: 'Capacitance', group: 'electrical' },
    mF: { base: 0.001, label: 'Capacitance', group: 'electrical' },
    uF: { base: 0.000001, label: 'Capacitance', group: 'electrical' },
    nF: { base: 0.000000001, label: 'Capacitance', group: 'electrical' },
    pF: { base: 0.000000000001, label: 'Capacitance', group: 'electrical' },
    Hz: { base: 1, label: 'Frequency', group: 'electrical' },
    kHz: { base: 1000, label: 'Frequency', group: 'electrical' },
    MHz: { base: 1000000, label: 'Frequency', group: 'electrical' },
    GHz: { base: 1000000000, label: 'Frequency', group: 'electrical' },
    C: { base: 1, label: 'Charge', group: 'electrical' },
    mC: { base: 0.001, label: 'Charge', group: 'electrical' },
    uC: { base: 0.000001, label: 'Charge', group: 'electrical' },
    S: { base: 1, label: 'Conductance', group: 'electrical' },
    mS: { base: 0.001, label: 'Conductance', group: 'electrical' },
    uS: { base: 0.000001, label: 'Conductance', group: 'electrical' },
    VA: { base: 1, label: 'Apparent power', group: 'electrical' },
    kVA: { base: 1000, label: 'Apparent power', group: 'electrical' },
    MVA: { base: 1000000, label: 'Apparent power', group: 'electrical' },
    var: { base: 1, label: 'Reactive power', group: 'electrical' },
    kvar: { base: 1000, label: 'Reactive power', group: 'electrical' },
    Mvar: { base: 1000000, label: 'Reactive power', group: 'electrical' },
  },
  length: {
    mm: { base: 0.001, label: 'Length', group: 'length' },
    cm: { base: 0.01, label: 'Length', group: 'length' },
    m: { base: 1, label: 'Length', group: 'length' },
    km: { base: 1000, label: 'Length', group: 'length' },
    in: { base: 0.0254, label: 'Length', group: 'length' },
    ft: { base: 0.3048, label: 'Length', group: 'length' },
  },
  wire: {
    AWG: { base: 1, label: 'AWG', group: 'wire' },
    'mm²': { base: 1, label: 'Area', group: 'wire' },
  },
};

export function convertUnit({ category = 'electrical', fromUnit, toUnit, value }) {
  const units = UNIT_CATEGORIES[category] || UNIT_CATEGORIES.electrical;
  if (!units[fromUnit] || !units[toUnit]) {
    return { ok: false, error: 'Unsupported unit conversion.' };
  }

  if (category === 'wire') {
    if (fromUnit === 'AWG' && toUnit === 'mm²') {
      const awg = Number(value);
      return { ok: true, value: awgAreaMm2(awg), resultText: `${awgAreaMm2(awg).toFixed(4)} mm²` };
    }
    if (fromUnit === 'mm²' && toUnit === 'AWG') {
      const area = Number(value);
      const awg = 39 - (Math.log(area / 0.000506707) / Math.log(92));
      return { ok: true, value: awg, resultText: `${awg.toFixed(2)} AWG` };
    }
  }

  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return { ok: false, error: 'Input value must be a number.' };
  }

  const baseValue = numeric * units[fromUnit].base;
  const converted = baseValue / units[toUnit].base;

  return { ok: true, value: converted, resultText: `${converted.toFixed(6).replace(/\.0+$|(?<=\.[0-9]*?)0+$/g, '')} ${toUnit}` };
}
