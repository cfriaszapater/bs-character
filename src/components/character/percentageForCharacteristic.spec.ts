import { percentageForCharacteristic } from "./percentageForCharacteristic";

it("should return relative percentage of characteristic", () => {
  expect(percentageForCharacteristic("Sta", 15)).toBe(0.75);
});
