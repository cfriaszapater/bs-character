export function percentageForCharacteristic(
  key: string,
  value: number
): number {
  const min = minCharacteristicValue(key);
  return Math.max(value - min, 0) / (maxCharacteristicValue(key) - min);
}

function maxCharacteristicValue(key: string): number {
  switch (key) {
    case "Ini":
      return 11;
    case "Sta":
      return 20;
    case "Imp":
      return 5;
    case "Da":
      return 8;
    case "HP":
      return 20;
    default:
      return 11;
  }
}
function minCharacteristicValue(key: string): number {
  switch (key) {
    case "Ini":
      return 3;
    case "Sta":
      return 0;
    case "Imp":
      return 2;
    case "Da":
      return 2;
    case "HP":
      return 0;
    default:
      return 0;
  }
}
