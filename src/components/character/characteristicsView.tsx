import React from "react";
import { Characteristics } from "../../store/character/types";
import {
  agilityColor,
  defaultColor,
  staminaColor,
  strengthColor,
  willColor
} from "./colors";
import HorizontalPercentageBar from "./horizontalPercentageBar";
import { percentageForCharacteristic } from "./percentageForCharacteristic";

export function CharacteristicsView(props: {
  characteristics: Characteristics;
}) {
  const { characteristics } = props;
  return (
    <div id="characteristics" className="col-3 grouped-container">
      <Initiative value={characteristics.initiative} />
      <Stamina value={characteristics.stamina} />
      <Impact value={characteristics.impact} />
      <Damage value={characteristics.damage} />
      <Health value={characteristics.health} />
    </div>
  );
}

function Initiative(props: { value: number }) {
  return Characteristic("Ini", props.value, defaultColor);
}

function Stamina(props: { value: number }) {
  return Characteristic("Sta", props.value, staminaColor);
}

function Impact(props: { value: number }) {
  return Characteristic("Imp", props.value, agilityColor);
}

function Damage(props: { value: number }) {
  return Characteristic("Da", props.value, strengthColor);
}

function Health(props: { value: number }) {
  return Characteristic("HP", props.value, willColor);
}

function Characteristic(name: string, value: number, color: string) {
  return (
    <div className="row innergrid-with-bottom">
      <div className="col-2">{name} </div>
      <div className="col-2 num">{value}</div>
      <HorizontalPercentageBar
        width={percentageForCharacteristic(name, value)}
        backgroundColor={color}
      />
    </div>
  );
}
