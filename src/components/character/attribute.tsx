import React from "react";
import HorizontalPercentageBar from "./horizontalPercentageBar";

const maxAttributeValue = 5;

export default function Attribute(props: { name: string; value: number }) {
  const color = colorForAttribute(props.name);
  return (
    <div className="row innergrid">
      <div className="col-1">{props.name} </div>
      <div className="col-1 num">{props.value}</div>
      <HorizontalPercentageBar
        width={(props.value * 100) / maxAttributeValue}
        backgroundColor={color}
      />
    </div>
  );
}

function colorForAttribute(key: string) {
  switch (key) {
    case "T":
      return "gray";
    case "A":
      return "blue";
    case "S":
      return "darkred";
    case "W":
      return "gold";
    default:
      return "gray";
  }
}
