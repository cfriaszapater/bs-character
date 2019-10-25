import React from "react";
import { Characteristics } from "../../store/character/types";
import {
  agilityColor,
  defaultColor,
  staminaColor,
  strengthColor,
  willColor
} from "./colors";
import { fractionForCharacteristic } from "./fractionForCharacteristic";
import HorizontalPercentageBar from "./horizontalPercentageBar";

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
  return Characteristic(
    "Da",
    props.value,
    fractionForCharacteristic(props.value, 3, 11),
    defaultColor
  );
}

function Stamina(props: { value: number }) {
  return Characteristic(
    "Da",
    props.value,
    fractionForCharacteristic(props.value, 0, 20),
    staminaColor
  );
}

function Impact(props: { value: number }) {
  return Characteristic(
    "Da",
    props.value,
    fractionForCharacteristic(props.value, 2, 5),
    agilityColor
  );
}

function Damage(props: { value: number }) {
  return Characteristic(
    "Da",
    props.value,
    fractionForCharacteristic(props.value, 2, 8),
    strengthColor
  );
}

function Health(props: { value: number }) {
  return Characteristic(
    "HP",
    props.value,
    fractionForCharacteristic(props.value, 0, 20),
    willColor
  );
}

function Characteristic(
  name: string,
  value: number,
  fractionValue: number,
  color: string
) {
  return (
    <div className="row innergrid-with-bottom">
      <div className="col-2">{name} </div>
      <div className="col-2 num">{value}</div>
      <HorizontalPercentageBar
        widthFraction={fractionValue}
        backgroundColor={color}
      />
    </div>
  );
}
