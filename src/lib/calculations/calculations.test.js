import { describe, expect, it } from 'vitest';
import { decodeResistor } from './resistor';
import { decodeSmdCode } from './smd';
import { calculateOhmsLaw } from './ohmsLaw';
import { awgAreaMm2 } from './wireCable';
import { calculateElectricalPower } from './power';
import { convertUnit } from './units';
import { calculateBatteryBackup, calculateSolarArray } from './solarBattery';

describe('resistor colour code', () => {
  it('decodes a 4-band resistor correctly', () => {
    const result = decodeResistor({ bandMode: '4', colours: ['brown', 'black', 'red', 'gold'] });
    expect(result.ok).toBe(true);
    expect(result.nominalOhms).toBe(1000);
    expect(result.tolerancePercent).toBe(5);
    expect(result.minOhms).toBeCloseTo(950, 2);
    expect(result.maxOhms).toBeCloseTo(1050, 2);
  });

  it('decodes a 5-band resistor correctly', () => {
    const result = decodeResistor({ bandMode: '5', colours: ['brown', 'black', 'black', 'red', 'brown'] });
    expect(result.ok).toBe(true);
    expect(result.nominalOhms).toBe(10000);
    expect(result.tolerancePercent).toBe(1);
  });

  it('rejects invalid resistor colours', () => {
    const result = decodeResistor({ bandMode: '4', colours: ['brown', 'invalid', 'red', 'gold'] });
    expect(result.ok).toBe(false);
  });
});

describe('SMD resistor codes', () => {
  it('decodes example SMD values', () => {
    expect(decodeSmdCode('472').ok).toBe(true);
    expect(decodeSmdCode('1002').ok).toBe(true);
    expect(decodeSmdCode('4R7').ok).toBe(true);
    expect(decodeSmdCode('R22').ok).toBe(true);
    expect(decodeSmdCode('0R0').ok).toBe(true);
  });

  it('rejects malformed code', () => {
    expect(decodeSmdCode('ZZZ').ok).toBe(false);
  });
});

describe('ohm law', () => {
  it('solves 12 V across 6 Ω correctly', () => {
    const result = calculateOhmsLaw({ mode: 'current-resistance', voltageV: 12, currentA: 2, resistanceOhms: 6, powerW: 24 });
    expect(result.ok).toBe(true);
    expect(result.voltageV).toBeCloseTo(12, 2);
    expect(result.powerW).toBeCloseTo(24, 2);
  });

  it('rejected division by zero', () => {
    const result = calculateOhmsLaw({ mode: 'voltage-resistance', voltageV: 5, currentA: null, resistanceOhms: 0, powerW: null });
    expect(result.ok).toBe(false);
  });
});

describe('AWG conversions', () => {
  it('returns expected areas for common AWG sizes', () => {
    expect(awgAreaMm2(12)).toBeCloseTo(3.31, 1);
    expect(awgAreaMm2(10)).toBeCloseTo(5.26, 1);
    expect(awgAreaMm2(10)).toBeGreaterThan(awgAreaMm2(12));
  });
});

describe('power calculator', () => {
  it('calculates single-phase real power from voltage, current, and PF', () => {
    const result = calculateElectricalPower({ systemType: 'single', voltageV: 230, currentA: 10, powerFactor: 0.8 });
    expect(result.ok).toBe(true);
    expect(result.realPowerW).toBeCloseTo(1840, 2);
  });

  it('calculates balanced three-phase power', () => {
    const result = calculateElectricalPower({ systemType: 'three', voltageV: 400, currentA: 10, powerFactor: 0.8 });
    expect(result.ok).toBe(true);
    expect(result.realPowerW).toBeCloseTo(5542.56, 2);
  });
});

describe('unit conversions', () => {
  it('performs standard conversions', () => {
    expect(convertUnit({ category: 'electrical', fromUnit: 'kV', toUnit: 'V', value: 1 }).value).toBeCloseTo(1000, 6);
    expect(convertUnit({ category: 'electrical', fromUnit: 'A', toUnit: 'mA', value: 1 }).value).toBeCloseTo(1000, 6);
    expect(convertUnit({ category: 'electrical', fromUnit: 'kWh', toUnit: 'MJ', value: 1 }).value).toBeCloseTo(3.6, 6);
    expect(convertUnit({ category: 'length', fromUnit: 'in', toUnit: 'mm', value: 1 }).value).toBeCloseTo(25.4, 6);
  });
});

describe('solar and battery', () => {
  it('calculates battery backup duration', () => {
    const result = calculateBatteryBackup({ loadPowerW: 100, batteryVoltageV: 12, batteryCapacityAh: 100, depthOfDischarge: 0.8, inverterEfficiency: 0.9 });
    expect(result.ok).toBe(true);
    expect(result.nominalWh).toBeCloseTo(1200, 2);
    expect(result.deliveredWh).toBeCloseTo(864, 2);
    expect(result.backupHours).toBeCloseTo(8.64, 2);
  });

  it('sizes solar array from daily demand', () => {
    const result = calculateSolarArray({ dailyEnergyWh: 2000, peakSunHours: 5, systemEfficiency: 0.8 });
    expect(result.ok).toBe(true);
    expect(result.requiredArrayPowerW).toBeCloseTo(500, 2);
  });
});
