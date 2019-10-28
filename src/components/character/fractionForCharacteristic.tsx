const minFraction = 0.05;

export function fractionForCharacteristic(
  value: number,
  min: number,
  max: number
) {
  return Math.max((value - min) / (max - min), minFraction);
}
