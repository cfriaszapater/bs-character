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
import { cellNumStyle, cellStyle } from "./styles";

export function CharacteristicsView(props: {
  characteristics: Characteristics;
}) {
  const { characteristics } = props;
  return (
    <div id="characteristics" className="col-3 grouped-container">
      <Initiative
        currentValue={characteristics.currentInitiative}
        value={characteristics.initiative}
      />
      <Stamina
        currrentValue={characteristics.currentStamina}
        value={characteristics.stamina}
      />
      <Impact value={characteristics.impact} />
      <Damage value={characteristics.damage} />
      <Health
        currentValue={characteristics.currentHealth}
        value={characteristics.health}
      />
    </div>
  );
}

function Initiative(props: { currentValue: number; value: number }) {
  return VariableCharacteristic(
    "Ini",
    props.currentValue,
    fractionForCharacteristic(props.currentValue, 3, 11),
    props.value,
    defaultColor
  );
}

function Stamina(props: { currrentValue: number; value: number }) {
  return VariableCharacteristic(
    "Sta",
    props.currrentValue,
    fractionForCharacteristic(props.currrentValue, 0, 20),
    props.value,
    staminaColor
  );
}

function Impact(props: { value: number }) {
  return Characteristic(
    "Imp",
    props.value.toString(),
    fractionForCharacteristic(props.value, 2, 5),
    agilityColor
  );
}

function Damage(props: { value: number }) {
  return Characteristic(
    "Da",
    props.value.toString(),
    fractionForCharacteristic(props.value, 2, 8),
    strengthColor
  );
}

function Health(props: { currentValue: number; value: number }) {
  return VariableCharacteristic(
    "HP",
    props.currentValue,
    fractionForCharacteristic(props.currentValue, 0, 20),
    props.value,
    willColor
  );
}

function Characteristic(
  name: string,
  value: string,
  fractionValue: number,
  color: string
) {
  return (
    <div className="row innergrid-with-bottom">
      <div className={cellStyle()}>{name} </div>
      <div className={cellNumStyle()}>{value}</div>
      <HorizontalPercentageBar
        widthFraction={fractionValue}
        backgroundColor={color}
      />
    </div>
  );
}

function VariableCharacteristic(
  name: string,
  currentValue: number,
  fractionValue: number,
  value: number,
  color: string
) {
  return Characteristic(name, currentValue + "/" + value, fractionValue, color);
}
