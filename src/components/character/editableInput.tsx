import React from "react";

export function EditableInput(
  name: string,
  currentValue: number,
  maxValue: number,
  handleChange: (e: React.SyntheticEvent<HTMLInputElement>) => void,
  minValue?: number
) {
  return (
    <input
      type="number"
      id={name + "-currentvalue"}
      name={name + "-currentvalue"}
      min={minValue ? minValue : "0"}
      max={maxValue}
      value={currentValue}
      className="editablenum"
      onChange={handleChange}
      ref={input => input && input.focus()}
    />
  );
}
