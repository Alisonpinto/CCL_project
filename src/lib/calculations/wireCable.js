export function awgAreaMm2(awgNumber) {
  const awg = Number(awgNumber);
  if (!Number.isFinite(awg) || awg < 0) {
    throw new Error('AWG value must be a non-negative number.');
  }

  const diameterInches = 0.005 * Math.pow(92, (36 - awg) / 39);
  const diameterMm = diameterInches * 25.4;
  return (Math.PI * diameterMm * diameterMm) / 4;
}

export function awgDiameterMm(awgNumber) {
  const awg = Number(awgNumber);
  if (!Number.isFinite(awg) || awg < 0) {
    throw new Error('AWG value must be a non-negative number.');
  }

  const diameterInches = 0.005 * Math.pow(92, (36 - awg) / 39);
  return diameterInches * 25.4;
}

export function estimateCableSize({
  material = 'copper',
  voltageV,
  currentA,
  lengthM,
  allowedDropPercent,
  supplyType = 'dc',
}) {
  const voltage = Number(voltageV);
  const current = Number(currentA);
  const length = Number(lengthM);
  const allowedDrop = Number(allowedDropPercent);

  if (!Number.isFinite(voltage) || voltage <= 0) {
    return { ok: false, error: 'Supply voltage must be a positive number.' };
  }
  if (!Number.isFinite(current) || current <= 0) {
    return { ok: false, error: 'Current must be a positive number.' };
  }
  if (!Number.isFinite(length) || length <= 0) {
    return { ok: false, error: 'Cable length must be positive.' };
  }
  if (!Number.isFinite(allowedDrop) || allowedDrop <= 0 || allowedDrop >= 100) {
    return { ok: false, error: 'Allowed voltage drop percentage must be between 0 and 100%.' };
  }

  const resistivity = material === 'aluminium' ? 0.0282 : 0.01724;
  const loopLength = 2 * length;
  const allowedDropVoltage = voltage * (allowedDrop / 100);
  const requiredAreaMm2 = (current * resistivity * loopLength) / allowedDropVoltage;
  const voltageDropV = (current * resistivity * loopLength) / requiredAreaMm2;
  const receivingVoltageV = voltage - voltageDropV;

  const awgOptions = Array.from({ length: 31 }, (_, index) => 4 + index * 2).concat([40]);
  const nearestAwg = awgOptions
    .map((awg) => ({ awg, area: awgAreaMm2(awg) }))
    .filter(({ area }) => area >= requiredAreaMm2)
    .sort((a, b) => a.area - b.area)[0];

  return {
    ok: true,
    material,
    supplyType,
    loopLengthM: loopLength,
    allowedDropVoltageV: allowedDropVoltage,
    requiredAreaMm2,
    nearestAwg: nearestAwg ? nearestAwg.awg : null,
    nearestAreaMm2: nearestAwg ? nearestAwg.area : null,
    voltageDropV,
    receivingVoltageV,
    note: 'Educational estimate only. Check ampacity, installation method, and local electrical codes before final design.',
  };
}
