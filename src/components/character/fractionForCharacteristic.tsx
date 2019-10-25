export function fractionForCharacteristic(
  value: number,
  min: number,
  max: number
) {
  return Math.max(value - min, 0) / (max - min);
}
