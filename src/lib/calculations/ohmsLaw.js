export function calculateOhmsLaw({ mode = 'voltage-current', voltageV, currentA, resistanceOhms, powerW }) {
  const v = Number(voltageV);
  const i = Number(currentA);
  const r = Number(resistanceOhms);
  const p = Number(powerW);

  const toNumber = (value) => Number.isFinite(value) ? value : null;

  const voltage = toNumber(v);
  const current = toNumber(i);
  const resistance = toNumber(r);
  const power = toNumber(p);

  const result = {
    ok: true,
    voltageV: voltage,
    currentA: current,
    resistanceOhms: resistance,
    powerW: power,
    formula: '',
    summary: '',
  };

  switch (mode) {
    case 'voltage-current': {
      if (voltage === null || current === null) {
        return { ok: false, error: 'Voltage and current must both be valid numbers.' };
      }
      const resistanceValue = voltage / current;
      const powerValue = voltage * current;
      return { ...result, ok: true, resistanceOhms: resistanceValue, powerW: powerValue, formula: 'R = V / I', summary: `R = ${voltage} / ${current} = ${resistanceValue.toFixed(3)} Ω; P = V × I = ${powerValue.toFixed(3)} W` };
    }
    case 'voltage-resistance': {
      if (voltage === null || resistance === null) {
        return { ok: false, error: 'Voltage and resistance must both be valid numbers.' };
      }
      if (resistance === 0) {
        return { ok: false, error: 'Resistance cannot be zero.' };
      }
      const currentValue = voltage / resistance;
      const powerValue = (voltage * voltage) / resistance;
      return { ...result, ok: true, currentA: currentValue, powerW: powerValue, formula: 'I = V / R', summary: `I = ${voltage} / ${resistance} = ${currentValue.toFixed(3)} A; P = V² / R = ${powerValue.toFixed(3)} W` };
    }
    case 'current-resistance': {
      if (current === null || resistance === null) {
        return { ok: false, error: 'Current and resistance must both be valid numbers.' };
      }
      if (resistance === 0) {
        return { ok: false, error: 'Resistance cannot be zero.' };
      }
      const voltageValue = current * resistance;
      const powerValue = (current * current) * resistance;
      return { ...result, ok: true, voltageV: voltageValue, powerW: powerValue, formula: 'V = I × R', summary: `V = ${current} × ${resistance} = ${voltageValue.toFixed(3)} V; P = I² × R = ${powerValue.toFixed(3)} W` };
    }
    case 'voltage-power': {
      if (voltage === null || power === null) {
        return { ok: false, error: 'Voltage and power must both be valid numbers.' };
      }
      if (voltage === 0) {
        return { ok: false, error: 'Voltage cannot be zero.' };
      }
      const currentValue = power / voltage;
      const resistanceValue = (voltage * voltage) / power;
      return { ...result, ok: true, currentA: currentValue, resistanceOhms: resistanceValue, formula: 'I = P / V', summary: `I = ${power} / ${voltage} = ${currentValue.toFixed(3)} A; R = V² / P = ${resistanceValue.toFixed(3)} Ω` };
    }
    case 'current-power': {
      if (current === null || power === null) {
        return { ok: false, error: 'Current and power must both be valid numbers.' };
      }
      if (current === 0) {
        return { ok: false, error: 'Current cannot be zero.' };
      }
      const voltageValue = power / current;
      const resistanceValue = power / (current * current);
      return { ...result, ok: true, voltageV: voltageValue, resistanceOhms: resistanceValue, formula: 'V = P / I', summary: `V = ${power} / ${current} = ${voltageValue.toFixed(3)} V; R = P / I² = ${resistanceValue.toFixed(3)} Ω` };
    }
    case 'resistance-power': {
      if (resistance === null || power === null) {
        return { ok: false, error: 'Resistance and power must both be valid numbers.' };
      }
      if (resistance <= 0) {
        return { ok: false, error: 'Resistance must be positive.' };
      }
      const currentValue = Math.sqrt(power / resistance);
      const voltageValue = currentValue * resistance;
      return { ...result, ok: true, currentA: currentValue, voltageV: voltageValue, formula: 'I = √(P / R)', summary: `I = √(${power} / ${resistance}) = ${currentValue.toFixed(3)} A; V = I × R = ${voltageValue.toFixed(3)} V` };
    }
    default:
      return { ok: false, error: 'Unsupported calculation mode.' };
  }
}
