import { fractionForCharacteristic } from "./fractionForCharacteristic";

it("should return relative percentage of characteristic", () => {
  expect(fractionForCharacteristic(15, 0, 20)).toBe(0.75);
});
