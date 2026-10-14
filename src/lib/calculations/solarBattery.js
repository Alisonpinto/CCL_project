export function calculateBatteryBackup({
  loadPowerW,
  batteryVoltageV,
  batteryCapacityAh,
  batteryCapacityWh,
  depthOfDischarge = 0.8,
  inverterEfficiency = 0.9,
  reserveMargin = 0,
}) {
  const load = Number(loadPowerW);
  const voltage = Number(batteryVoltageV);
  const capacityAh = Number(batteryCapacityAh);
  const capacityWh = Number(batteryCapacityWh);
  const dod = Number(depthOfDischarge);
  const inverter = Number(inverterEfficiency);
  const reserve = Number(reserveMargin);

  if (!Number.isFinite(load) || load <= 0) {
    return { ok: false, error: 'Load power must be positive.' };
  }
  if (!Number.isFinite(voltage) || voltage <= 0) {
    return { ok: false, error: 'Battery voltage must be positive.' };
  }
  if (!Number.isFinite(dod) || dod <= 0 || dod > 1) {
    return { ok: false, error: 'Depth of discharge must be between 0 and 1.' };
  }
  if (!Number.isFinite(inverter) || inverter <= 0 || inverter > 1) {
    return { ok: false, error: 'Inverter efficiency must be between 0 and 1.' };
  }

  const nominalWh = Number.isFinite(capacityWh) && capacityWh > 0
    ? capacityWh
    : (Number.isFinite(capacityAh) && capacityAh > 0 ? voltage * capacityAh : null);

  if (nominalWh === null) {
    return { ok: false, error: 'Specify either battery capacity in Ah or Wh.' };
  }

  const usableWh = nominalWh * dod;
  const deliveredWh = usableWh * inverter * (1 - reserve);
  const backupHours = deliveredWh / load;

  return {
    ok: true,
    nominalWh,
    usableWh,
    deliveredWh,
    backupHours,
    backupMinutes: backupHours * 60,
    formula: 'Usable energy = nominal battery energy × DoD × inverter efficiency × (1 - reserve)',
  };
}

export function calculateSolarArray({
  dailyEnergyWh,
  peakSunHours,
  systemEfficiency = 0.8,
  panelRatingW,
}) {
  const dailyEnergy = Number(dailyEnergyWh);
  const sunHours = Number(peakSunHours);
  const efficiency = Number(systemEfficiency);

  if (!Number.isFinite(dailyEnergy) || dailyEnergy <= 0) {
    return { ok: false, error: 'Daily energy demand must be positive.' };
  }
  if (!Number.isFinite(sunHours) || sunHours <= 0) {
    return { ok: false, error: 'Peak sun hours must be positive.' };
  }
  if (!Number.isFinite(efficiency) || efficiency <= 0 || efficiency > 1) {
    return { ok: false, error: 'System efficiency must be between 0 and 1.' };
  }

  const arrayPowerW = dailyEnergy / (sunHours * efficiency);
  const estimatedGenerationWh = arrayPowerW * sunHours * efficiency;
  const panelCount = Number.isFinite(panelRatingW) && panelRatingW > 0 ? Math.ceil(arrayPowerW / panelRatingW) : null;

  return {
    ok: true,
    requiredArrayPowerW: arrayPowerW,
    estimatedDailyGenerationWh: estimatedGenerationWh,
    panelCount,
    formula: 'Array power = daily energy / (peak sun hours × efficiency)',
  };
}
