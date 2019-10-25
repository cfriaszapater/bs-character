import React from "react";
import HorizontalPercentageBar from "./horizontalPercentageBar";

const defaultColor = "gray";

export function Tenacity(props: { value: number }) {
  return Attribute("T", props.value, defaultColor);
}

export function Agility(props: { value: number }) {
  return Attribute("A", props.value, "blue");
}

export function Strength(props: { value: number }) {
  return Attribute("S", props.value, "darkred");
}

export function Will(props: { value: number }) {
  return Attribute("W", props.value, "gold");
}

export function Intelligence(props: { value: number }) {
  return Attribute("I", props.value, defaultColor);
}

export function Leadership(props: { value: number }) {
  return Attribute("L", props.value, defaultColor);
}

export function Power(props: { value: number }) {
  return Attribute("P", props.value, defaultColor);
}

export function Defense(props: { value: number }) {
  return Attribute("D", props.value, defaultColor);
}

export function Extension(props: { value: number }) {
  return Attribute("E", props.value, defaultColor);
}

function Attribute(name: string, value: number, color: string) {
  return (
    <div className="row innergrid">
      <div className="col-1">{name} </div>
      <div className="col-1 num">{value}</div>
      <HorizontalPercentageBar
        width={percentageForAttribute(value)}
        backgroundColor={color}
      />
    </div>
  );
}

const maxAttributeValue = 5;

function percentageForAttribute(value: number): number {
  return value / maxAttributeValue;
}
