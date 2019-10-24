import React from "react";
import HorizontalPercentageBar from "./horizontalPercentageBar";
import { percentageForCharacteristic } from "./percentageForCharacteristic";

export default function Characteristic(props: { name: string; value: number }) {
  return (
    <div className="row innergrid-with-bottom">
      <div className="col-2">{props.name} </div>
      <div className="col-2 num">{props.value}</div>
      <HorizontalPercentageBar
        width={percentageForCharacteristic(props.name, props.value)}
        backgroundColor={colorForCharacteristic(props.name)}
      />
    </div>
  );
}

function colorForCharacteristic(key: string): string {
  switch (key) {
    case "Sta":
      return "lightgreen";
    case "Imp":
      return "blue";
    case "Da":
      return "darkred";
    case "HP":
      return "gold";
    default:
      return "gray";
  }
}
