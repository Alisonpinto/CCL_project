export function calculateElectricalPower({ systemType = 'single', voltageV, currentA, powerFactor = 1, efficiency = 1, mode: _mode = 'real' }) {
  const voltage = Number(voltageV);
  const current = Number(currentA);
  const pf = Number(powerFactor);
  const eff = Number(efficiency);

  if (systemType === 'dc') {
    if (!Number.isFinite(voltage) || !Number.isFinite(current)) {
      return { ok: false, error: 'Voltage and current must be valid numbers.' };
    }
    const realPower = voltage * current;
    return {
      ok: true,
      type: 'DC',
      realPowerW: realPower,
      apparentPowerVA: realPower,
      reactivePowerVar: 0,
      formula: 'P = V × I',
      summary: `P = ${voltage} × ${current} = ${realPower.toFixed(2)} W`,
    };
  }

  if (!Number.isFinite(voltage) || !Number.isFinite(current)) {
    return { ok: false, error: 'Voltage and current must be valid numbers.' };
  }

  if (!Number.isFinite(pf) || pf <= 0 || pf > 1) {
    return { ok: false, error: 'Power factor must be in the range (0, 1].' };
  }

  const apparentPower = voltage * current;
  const realPower = apparentPower * pf;
  const reactivePower = apparentPower * Math.sqrt(1 - pf * pf);

  const outputPower = eff >= 0 && eff <= 1 ? realPower * eff : realPower;

  return {
    ok: true,
    type: systemType === 'three' ? 'Three-phase balanced' : 'Single-phase AC',
    apparentPowerVA: systemType === 'three' ? Math.sqrt(3) * voltage * current : apparentPower,
    realPowerW: systemType === 'three' ? Math.sqrt(3) * voltage * current * pf : realPower,
    reactivePowerVar: systemType === 'three' ? Math.sqrt(3) * voltage * current * Math.sqrt(1 - pf * pf) : reactivePower,
    outputPowerW: outputPower,
    formula: systemType === 'three' ? 'P = √3 × V_LL × I_L × PF' : 'P = V × I × PF',
    summary: systemType === 'three'
      ? `P = √3 × ${voltage} × ${current} × ${pf} = ${(Math.sqrt(3) * voltage * current * pf).toFixed(2)} W`
      : `P = ${voltage} × ${current} × ${pf} = ${realPower.toFixed(2)} W`,
  };
}
