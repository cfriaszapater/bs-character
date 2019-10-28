import { fractionForCharacteristic } from "./fractionForCharacteristic";

it("should return relative fraction", () => {
  expect(fractionForCharacteristic(15, 0, 20)).toBe(0.75);
});

it("should return minimum fraction", () => {
  expect(fractionForCharacteristic(2, 3, 6)).toBe(0.05);
});
